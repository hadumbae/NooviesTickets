/**
 * @fileoverview Utility for adding a scheduled showing expiry job to the queue.
 */

import type {Job} from "bullmq";
import {showingExpiryQueue} from "@/domains/showings/_feat/showing-redis/showingExpiryQueue";
import {Types} from "mongoose";

type JobConfig = {
    _id: Types.ObjectId;
    time: Date;
    job: "start" | "complete";
}

/**
 * Adds a scheduled job to the showing expiry queue with a calculated delay.
 */
export function addShowingExpiryJob(
    {_id, job, time}: JobConfig
): Promise<Job> {
    return showingExpiryQueue.add(
        job,
        {showingId: _id},
        {jobId:`${_id}:${job}` , delay: time.getTime() - Date.now()}
    );
}