/**
 * @fileoverview Service for resetting a pending reservation's expiration timer.
 */

import {Types} from "mongoose";
import {DateTime, type DurationLike} from "luxon";
import createHttpError from "http-errors";
import {ShowingModel} from "@/domains/showings/_models/showing/Showing.model";
import {ReservationModel} from "@/domains/reservations/_models/reservation/Reservation.model";
import {LeanUserQuerySelectFields} from "@/domains/users/_feat/query-population/LeanUserQuerySelectFields";
import type {DocumentType} from "@/shared/_types/mongoose/DocumentType";
import type {AdminReservation} from "@/domains/reservations/_feat/fetch-customer-reservations/types/AdminReservation";
import {fetchAdminReservationByID} from "@/domains/reservations/_feat/fetch-customer-reservations/utilities";
import {
    addReservationLifecycleJob,
} from "@/domains/reservations/_feat/reservation-queues/lifecycle/addReservationLifecycleJob";
import {
    removeReservationLifecycleJob
} from "@/domains/reservations/_feat/reservation-queues/lifecycle/removeReservationLifecycleJob";

/** Parameters required to extend or reset a reservation's expiration TTL. */
export type ResetReservationExpiryParams = {
    reservationID: Types.ObjectId;
    duration?: DurationLike;
};

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
