/**
 * @fileoverview Business logic for finalizing a client's reservation checkout.
 */

import {Types} from "mongoose";
import createHttpError from "http-errors";
import {BookingError} from "@/shared/_errors/reservations/BookingError";
import type {DocumentType} from "@/shared/_types/mongoose/DocumentType";
import {ReservationModel, type ReservationSchemaFields} from "@/domains/reservations/_models/reservation";
import {assertReservationOwnership, assertReservationNotExpired} from "@/domains/reservations/_feat/assert-reservations";
import {
    addReservationLifecycleJob,
    removeReservationLifecycleJob
} from "@/domains/reservations/_feat/reservation-queues";
import {ShowingModel} from "@/domains/showings";

/** Parameters required to finalize a pending reservation. */
export type CheckoutClientReservationParams = {
    userID: Types.ObjectId;
    reservationID: Types.ObjectId;
};

/**
 * Transitions a reservation from a temporary hold (`RESERVED`) to a finalized `PAID` state.
 * @throws {BookingError} 409 - If the status is not 'RESERVED'.
 */
export async function checkoutClientReservation(
    {userID, reservationID}: CheckoutClientReservationParams
): Promise<DocumentType<ReservationSchemaFields>> {
    const reservation = await ReservationModel.findById(reservationID);
    if (!reservation) throw createHttpError(404, "Reservation Not Found");

    const showing = await ShowingModel.findById(reservation.showing).select("startTime endTime").lean();
    if (!showing) throw createHttpError(500, "Reservation With Invalid Showing");
    const {startTime, endTime} = showing;

    assertReservationOwnership({userID, reservation});
    assertReservationNotExpired(reservation);

    if (reservation.status !== "RESERVED") {
        throw new BookingError({
            statusCode: 409,
            errorCode: "ERR_INVALID_RESERVATION",
            message: "Invalid reservation status.",
        });
    }

    reservation.status = "PAID";
    reservation.isPaid = true;
    reservation.datePaid = new Date();

    await reservation.save();

    try {
        await removeReservationLifecycleJob({_id: reservation._id, job: "payment_expiry"});
        await addReservationLifecycleJob({_id: reservation._id, job: "showing_running", time: startTime});
        await addReservationLifecycleJob({_id: reservation._id, job: "showing_completed", time: endTime});
    } catch (error: unknown) {
        if (error instanceof Error) console.error("Reservation Lifecycle Queue Error: ", error.message ?? "UNKNOWN");
        throw createHttpError(500, "Checked Out Reservation, Failed To Update Lifecycle Queue");
    }

    return reservation;
}
