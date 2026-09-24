/**
 * @fileoverview Utility for adding a scheduled reservation lifecycle background job to the queue.
 */

import type {Job} from "bullmq";
import {Types} from "mongoose";
import type {
    ReservationCancellationJobName
} from "@/domains/reservations/_feat/reservation-queues/cancellation/reservationCancellationWorker";
import {
    reservationCancellationQueue
} from "@/domains/reservations/_feat/reservation-queues/cancellation/reservationCancellationQueue";

/** Props for the JobConfig type. */
type JobConfig = {
    _id: Types.ObjectId;
    job: ReservationCancellationJobName;
}

/**
 * Adds a scheduled reservation lifecycle job to the queue with a calculated delay.
 */
export async function addReservationCancellationJob(
    {_id, job}: JobConfig,
): Promise<Job> {
    return reservationCancellationQueue.add(
        job,
        {reservationId: _id},
        {jobId: `${_id}:${job}`}
    );
}