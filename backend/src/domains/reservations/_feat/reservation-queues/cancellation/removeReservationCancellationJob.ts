/**
 * @fileoverview Utility for removing a scheduled reservation lifecycle background job from the cancellation queue.
 */

import {Types} from "mongoose";
import {
    reservationCancellationQueue
} from "@/domains/reservations/_feat/reservation-queues/cancellation/reservationCancellationQueue";
import type {
    ReservationCancellationJobName
} from "@/domains/reservations/_feat/reservation-queues/cancellation/reservationCancellationWorker";

/** Props for the JobConfig type. */
type JobConfig = {
    _id: Types.ObjectId;
    job: ReservationCancellationJobName;
}

/**
 * Removes an existing reservation lifecycle background job from the cancellation queue.
 */
export async function removeReservationCancellationJob(
    {_id, job}: JobConfig,
): Promise<void> {
    const existingJob = await reservationCancellationQueue.getJob(`${_id}-${job}`);

    if (existingJob) {
        await existingJob.remove();
    }
}