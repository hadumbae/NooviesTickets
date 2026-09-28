/**
 * @fileoverview Business logic for client-side reservation lifecycle transitions.
 *
 */

import {BookingError} from "@/shared/_errors/reservations/BookingError";
import type {
    CancelClientReservationParams,
    CheckoutClientReservationParams
} from "@/domains/reservations/_feat/update-client-reservations/services/service.types";
import type {ShowingSchemaFields} from "@/domains/showings/_models/showing/Showing.types";
import {SeatMapModel} from "@/domains/seatmaps/_models/seat-map/SeatMap.model";
import {
    assertReservationExists,
    assertReservationNotExpired,
    assertReservationOwnership
} from "@/domains/reservations/_feat/assert-reservations";
import type {DocumentType} from "@/shared/_types/mongoose/DocumentType";
import {ReservationModel, type ReservationSchemaFields} from "@/domains/reservations/_models/reservation";
import createHttpError from "http-errors";
import {
    addReservationLifecycleJob,
    removeReservationLifecycleJob
} from "@/domains/reservations/_feat/reservation-queues";
import {ShowingModel} from "@/domains/showings";

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

/**
 * Orchestrates the cancellation of a reservation and release of inventory.
 */
export async function cancelClientReservation(
    {userID, reservationID}: CancelClientReservationParams
): Promise<DocumentType<ReservationSchemaFields>> {
    const reservation = await assertReservationExists(reservationID);
    assertReservationOwnership({userID, reservation});

    const {status: resStatus, reservationType: resType, selectedSeating} = reservation;

    if (resStatus === "CANCELLED") return reservation;

    if (resStatus === "RESERVED" || resStatus === "PAID") {
        if (resType === "RESERVED_SEATS") {
            await reservation.populate("showing");
            const populatedShowing = reservation.showing as unknown as ShowingSchemaFields;

            if (populatedShowing.status === "SCHEDULED" || populatedShowing.status === "SOLD_OUT") {
                await SeatMapModel.updateMany(
                    {_id: {$in: selectedSeating}},
                    {reservation: null, status: "AVAILABLE"}
                );
            }
        }

        reservation.status = "CANCELLED";
        reservation.dateCancelled = new Date();

        await reservation.save();
    }

    return reservation;
}