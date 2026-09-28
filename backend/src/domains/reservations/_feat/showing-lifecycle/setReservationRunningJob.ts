/**
 * @fileoverview Service utility for scheduling or updating running lifecycle jobs for reservations associated with a showing.
 */

import {Types} from "mongoose";
import {ReservationModel} from "@/domains/reservations/_models/reservation/Reservation.model";
import {
    addReservationLifecycleJob,
} from "@/domains/reservations/_feat/reservation-queues/lifecycle/addReservationLifecycleJob";
import {
    removeReservationLifecycleJob
} from "@/domains/reservations/_feat/reservation-queues/lifecycle/removeReservationLifecycleJob";

/** Props for the StatusConfig type. */
type StatusConfig = {
    _id: Types.ObjectId;
    time: Date;
}

/**
 * Iterates through paid reservations for a showing and schedules their running lifecycle jobs.
 */
export async function setReservationRunningJob(
    {_id, time}: StatusConfig
): Promise<void> {
    const reservations = await ReservationModel
        .find({showing: _id, status: {$in: ["RESERVED", "PAID"]}})
        .select("_id status")
        .lean();

    for (const {_id: reservationId} of reservations) {
        await removeReservationLifecycleJob({_id: reservationId, job: "showing_running"});
        await addReservationLifecycleJob({_id: reservationId, job: "showing_running", time});
    }
}