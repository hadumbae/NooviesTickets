/**
 * @fileoverview BullMQ queue instance configuration for handling showing expiry background jobs.
 */

import {Queue} from "bullmq";
import {redisConnection} from "@/config/redis";

/** Constant name identifying the showing expiry background queue. */
export const SHOWING_EXPIRY_QUEUE_NAME = "showing-expiry";

/** BullMQ queue instance configured for processing showing expiry operations. */
export const showingExpiryQueue = new Queue(
    SHOWING_EXPIRY_QUEUE_NAME,
    {
        connection: redisConnection,
        defaultJobOptions: {
            attempts: 3,
            backoff: {type: "exponential", delay: 1000},
            removeOnComplete: {count: 1000},
            removeOnFail: {count: 1000},
        },
    },
);