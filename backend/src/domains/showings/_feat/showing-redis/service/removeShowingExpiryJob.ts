/**
 * @fileoverview Utility for removing a scheduled showing expiry job from the queue.
 */

import {Types} from "mongoose";
import {showingExpiryQueue} from "@/domains/showings/_feat/showing-redis/showingExpiryQueue";

/** Configuration object for identifying a showing expiry job to remove. */
type JobConfig = {
    _id: Types.ObjectId;
    job: "start" | "complete";
}

/**
 * Removes an existing showing expiry job from the queue.
 */
export async function removeShowingExpiryJob(
    {_id, job}: JobConfig
): Promise<void> {
    const existingJob = await showingExpiryQueue.getJob(`${_id}-${job}`);

    if (existingJob) {
        await existingJob.remove();
    }
}