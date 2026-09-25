/**
 * @fileoverview Background worker for processing showing lifecycle status updates via BullMQ jobs.
 */

import {type Job, Worker} from "bullmq";
import {redisConnection} from "@/config/redis"
import {ShowingModel} from "@/domains/showings/_models/showing/Showing.model";
import {SHOWING_EXPIRY_QUEUE_NAME} from "@/domains/showings/_feat/showing-redis/showingExpiryQueue";
import type {ObjectIdString} from "@noovies-tickets/common";

/** BullMQ worker instance for managing showing state transitions based on scheduled expiry jobs. */
export const showingExpiryWorker = new Worker(
    SHOWING_EXPIRY_QUEUE_NAME,
    async (job: Job<{ showingId: ObjectIdString }>) => {
        const {showingId} = job.data;
        const showing = await ShowingModel.findById(showingId);

        if (!showing) return;
        const {status} = showing;

        if (job.name === "start") {
            if (status !== "SCHEDULED" && status !== "SOLD_OUT") return;
            showing.status = "RUNNING";
            await showing.save();
            console.log(`[${SHOWING_EXPIRY_QUEUE_NAME}] Showing ${showingId} -> RUNNING`);
            return
        }

        if (job.name === "complete") {
            if (status !== "RUNNING") return;
            showing.status = "COMPLETED";
            await showing.save();
            console.log(`[${SHOWING_EXPIRY_QUEUE_NAME}] Showing ${showingId} -> COMPLETED`);
            return
        }

    },
    {connection: redisConnection, stalledInterval: 30 * 60 * 1000}
);

showingExpiryWorker.on("failed", (job, error) => {
    console.warn(`[${SHOWING_EXPIRY_QUEUE_NAME}] Job ${job?.id} Failed: `, error.message);
});

showingExpiryWorker.on("error", (error) => {
    console.error(`[${SHOWING_EXPIRY_QUEUE_NAME}] Worker Encountered Error: `, error.message);
});