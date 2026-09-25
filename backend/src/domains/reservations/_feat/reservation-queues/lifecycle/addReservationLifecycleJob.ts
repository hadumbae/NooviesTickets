/**
 * @fileoverview Utility for adding a scheduled reservation lifecycle background job to the queue.
 */

import type {Job} from "bullmq";
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
    time: Date;
}

/**
 * Adds a scheduled reservation lifecycle job to the queue with a calculated delay.
 */
export async function addReservationLifecycleJob(
    {_id, job, time}: JobConfig,
): Promise<Job> {
    return reservationLifecycleQueue.add(
        job,
        {reservationId: _id},
        {jobId: `${_id}-${job}`, delay: time.getTime() - Date.now()}
    );
}