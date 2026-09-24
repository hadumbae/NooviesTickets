/**
 * @fileoverview Service for updating administrative reservation data and managing lifecycle states.
 *
 */

import {DateTime} from "luxon";
import createHttpError from "http-errors";
import {ShowingModel} from "@/domains/showings/_models/showing/Showing.model";
import {ReservationModel} from "@/domains/reservations/_models/reservation/Reservation.model";
import {LeanUserQuerySelectFields} from "@/domains/users/_feat/query-population/LeanUserQuerySelectFields";
import type {DocumentType} from "@/shared/_types/mongoose/DocumentType";
import type {AdminReservation} from "@/domains/reservations/_feat/fetch-customer-reservations/types/AdminReservation";
import {
    fetchAdminReservationByID,
    fetchRequiredAdminReservation
} from "@/domains/reservations/_feat/fetch-customer-reservations/utilities";
import type {
    CancelReservationParams,
    RefundReservationParams,
    ResetReservationExpiryParams,
    UpdateReservationNotesParams
} from "@/domains/reservations/_feat/update-reservations/service/service.types";
import {
    addReservationLifecycleJob,
    removeReservationCancellationJob,
    removeReservationLifecycleJob
} from "@/domains/reservations/_feat/reservation-queues";

/** Updates the administrative notes for a specific reservation. */
export async function updateReservationNotes(
    {reservationID, data}: UpdateReservationNotesParams
): Promise<AdminReservation> {
    const reservation = await fetchAdminReservationByID(reservationID);
    if (!reservation) throw createHttpError(404, "Reservation Not Found!");

    reservation.notes = data.notes ?? null;
    await reservation.save();

    return reservation;
}

/** Extends the expiration timestamp for a pending reservation if it is more than three days before the showing. */
export async function resetReservationExpiry(
    {reservationID, duration = {days: 1}}: ResetReservationExpiryParams
): Promise<AdminReservation> {
    const oldDoc = await fetchAdminReservationByID(reservationID);
    if (!oldDoc) throw createHttpError(404, "Reservation not found.");

    // --- INVALID STATUS ---

    if (oldDoc.status !== "RESERVED") {
        throw createHttpError(409, "Invalid status, must be 'RESERVED'.");
    }

    // --- SHOWING CHECK ---

    const showing = await ShowingModel.findById(oldDoc.showing).select("startTime").lean();
    if (!showing) throw createHttpError(404, "Reservation's showing does not exist.");

    const {startTime} = showing;

    const updatedExpiresAt = DateTime.now().toUTC().plus(duration);
    const showingCheck = DateTime.fromJSDate(startTime).toUTC().minus({days: 3});

    if (updatedExpiresAt >= showingCheck) {
        throw createHttpError(422, "Cannot reset expiry to within three days from showing.");
    }

    // --- UPDATE ---

    const updateData = {
        status: "RESERVED",
        expiresAt: updatedExpiresAt.toJSDate(),
    }

    const reservation = await ReservationModel.findOneAndUpdate<DocumentType<AdminReservation>>(
        {_id: oldDoc._id, status: oldDoc.status},
        updateData,
        {new: true, runValidators: true},
    );

    if (!reservation) {
        throw createHttpError(409, "Failed To Reset, Reservation Updated Mid-Operation");
    }

    // --- QUEUE ---

    try {
        await removeReservationLifecycleJob({
            _id: reservation._id,
            job: "payment_expiry",
        });

        await addReservationLifecycleJob({
            _id: reservation._id,
            job: "payment_expiry",
            time: reservation.expiresAt,
        });
    } catch (error) {
        throw createHttpError(500, "Reservation Updated, But Failed To Clear Queue");
    }

    await reservation.populate({path: "user", select: LeanUserQuerySelectFields})

    return reservation;
}

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
        await removeReservationLifecycleJob({_id: reservation._id, job: "payment_expiry"});
        await removeReservationCancellationJob({_id: reservation._id, job: "cancellation"});
    } catch (error) {
        throw createHttpError(500, "Reservation Updated, But Failed To Clear Queue");
    }

    await reservation.populate({path: "user", select: LeanUserQuerySelectFields})

    return reservation;
}

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
    await reservation.populate({path: "user", select: LeanUserQuerySelectFields})

    return reservation;
}
