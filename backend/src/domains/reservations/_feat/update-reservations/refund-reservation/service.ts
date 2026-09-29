/**
 * @fileoverview Service for refunding a reservation.
 */

import {Types} from "mongoose";
import createHttpError from "http-errors";
import {ReservationModel} from "@/domains/reservations/_models/reservation/Reservation.model";
import {LeanUserQuerySelectFields} from "@/domains/users/_feat/query-population/LeanUserQuerySelectFields";
import type {DocumentType} from "@/shared/_types/mongoose/DocumentType";
import type {AdminReservation} from "@/domains/reservations/_feat/fetch-customer-reservations/types/AdminReservation";
import {fetchRequiredAdminReservation} from "@/domains/reservations/_feat/fetch-customer-reservations/utilities";
import type {ReservationNotesInput} from "@/domains/reservations/_feat/update-reservations/update-reservation-notes";
import {
    removeReservationCancellationJob,
} from "@/domains/reservations/_feat/reservation-queues/cancellation/removeReservationCancellationJob";
import {
    clearReservationLifecycleQueue
} from "@/domains/reservations/_feat/reservation-queues/lifecycle/clearReservationLifecycleQueue";

/** Parameters required to execute a refund for a reservation. */
export type RefundReservationParams = {
    reservationID: Types.ObjectId;
    data?: ReservationNotesInput;
};

/** Transitions a paid or cancelled reservation to a refunded state. */
export async function refundReservation(
    {reservationID, data}: RefundReservationParams
): Promise<AdminReservation> {
    const oldDoc = await fetchRequiredAdminReservation(reservationID);
    const {status, dateCancelled} = oldDoc;

    // --- HAS NOT BEEN PAID ---

    if (!oldDoc.isPaid) {
        throw createHttpError(409, "Invalid status, must be a paid reservation.");
    }

    // --- INVALID STATUS ---

    if (status !== "PAID" && status !== "CANCELLED") {
        throw createHttpError(409, "Invalid status, must be 'PAID' or 'CANCELLED'.");
    }

    // --- UPDATE ---

    const updateData = {
        status: "REFUNDED",
        dateRefunded: new Date(),
        dateCancelled: status === "PAID" ? new Date() : dateCancelled,
        notes: data?.notes ?? oldDoc.notes ?? null,
    };

    const reservation = await ReservationModel.findOneAndUpdate<DocumentType<AdminReservation>>(
        {_id: oldDoc._id, status: oldDoc.status},
        updateData,
        {new: true, runValidators: true}
    );

    if (!reservation) throw createHttpError(409, "Failed To Refund, Reservation Updated Mid-Operation");
    await reservation.populate({path: "user", select: LeanUserQuerySelectFields});

    try {
        await clearReservationLifecycleQueue(reservation._id);
        await removeReservationCancellationJob({_id: reservation._id, job: "cancellation"});
    } catch (error) {
        throw createHttpError(500, "Reservation Updated, But Failed To Clear Queue");
    }

    return reservation;
}
