/**
 * @fileoverview Utility for removing a scheduled reservation lifecycle background job from the cancellation queue.
 */

import {Types} from "mongoose";
import type {
    ReservationLifecycleJobName
} from "@/domains/reservations/_feat/reservation-queues/lifecycle/reservationLifecycleWorker";
import {
    reservationLifecycleQueue
} from "@/domains/reservations/_feat/reservation-queues/lifecycle/reservationLifecycleQueue";

/** Props for the JobConfig type. */
type JobConfig = {
    _id: Types.ObjectId;
    job: ReservationLifecycleJobName;
}

/**
 * Removes an existing reservation lifecycle background job from the cancellation queue.
 */
export async function removeReservationLifecycleJob(
    {_id, job}: JobConfig,
): Promise<void> {
    const existingJob = await reservationLifecycleQueue.getJob(`${_id}:${job}`);

    if (existingJob) {
        await existingJob.remove();
    }
}