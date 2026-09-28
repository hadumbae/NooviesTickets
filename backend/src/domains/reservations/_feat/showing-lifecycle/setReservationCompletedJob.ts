/**
 * @fileoverview Service utility for scheduling or updating completed lifecycle jobs for reservations associated with a showing.
 */

import {Types} from "mongoose";
import {ReservationModel} from "@/domains/reservations";
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
 * Iterates through running reservations for a showing and schedules their completed lifecycle jobs.
 */
export async function setReservationCompletedJob(
    {_id, time}: StatusConfig
): Promise<void> {
    const reservations = await ReservationModel
        .find({showing: _id, status: {$in: ["RUNNING", "PAID"]}})
        .select("_id status")
        .lean();

    for (const {_id: reservationId} of reservations) {
        await removeReservationLifecycleJob({_id: reservationId, job: "showing_completed"});
        await addReservationLifecycleJob({_id: reservationId, job: "showing_completed", time});
    }
}