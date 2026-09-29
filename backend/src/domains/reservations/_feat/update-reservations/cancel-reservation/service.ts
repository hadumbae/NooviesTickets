/**
 * @fileoverview Service for cancelling a reservation.
 */

import {Types} from "mongoose";
import createHttpError from "http-errors";
import {ReservationModel} from "@/domains/reservations/_models/reservation/Reservation.model";
import {LeanUserQuerySelectFields} from "@/domains/users/_feat/query-population/LeanUserQuerySelectFields";
import type {DocumentType} from "@/shared/_types/mongoose/DocumentType";
import type {AdminReservation} from "@/domains/reservations/_feat/fetch-customer-reservations/types/AdminReservation";
import {fetchAdminReservationByID} from "@/domains/reservations/_feat/fetch-customer-reservations/utilities";
import type {ReservationNotesInput} from "@/domains/reservations/_feat/update-reservations/update-reservation-notes";
import {
    removeReservationCancellationJob,
} from "@/domains/reservations/_feat/reservation-queues/cancellation/removeReservationCancellationJob";
import {
    clearReservationLifecycleQueue
} from "@/domains/reservations/_feat/reservation-queues/lifecycle/clearReservationLifecycleQueue";

/** Parameters required to transition a reservation to a cancelled state. */
export type CancelReservationParams = {
    reservationID: Types.ObjectId;
    data?: ReservationNotesInput;
};

/** Transitions a reservation to a cancelled state and records the cancellation date. */
export async function cancelReservation(
    {reservationID, data}: CancelReservationParams
): Promise<AdminReservation> {
    const oldDoc = await fetchAdminReservationByID(reservationID);
    if (!oldDoc) throw createHttpError(404, "Reservation not found.");

    // --- INVALID STATUS ---

    if (oldDoc.status !== "RESERVED" && oldDoc.status !== "PAID") {
        throw createHttpError(409, "Invalid status, must be 'RESERVED' or 'PAID'.");
    }

    // --- UPDATE ---

    const updateData = {
        status: "CANCELLED",
        dateCancelled: new Date(),
        notes: data?.notes ?? oldDoc.notes ?? null,
    }

    const reservation = await ReservationModel.findOneAndUpdate<DocumentType<AdminReservation>>(
        {_id: oldDoc._id, status: oldDoc.status},
        updateData,
        {new: true, runValidators: true}
    );

    if (!reservation) {
        throw createHttpError(409, "Failed To Cancel, Reservation Updated Mid-Operation");
    }

    // --- QUEUE ---

    try {
        await clearReservationLifecycleQueue(reservation._id);
        await removeReservationCancellationJob({_id: reservation._id, job: "cancellation"});
    } catch (error) {
        throw createHttpError(500, "Reservation Updated, But Failed To Clear Queue");
    }

    await reservation.populate({path: "user", select: LeanUserQuerySelectFields})

    return reservation;
}
