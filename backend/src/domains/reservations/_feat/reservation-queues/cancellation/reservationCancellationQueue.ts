/**
 * @fileoverview BullMQ queue instance configuration for handling reservation cancellation background jobs.
 */

import {Queue} from "bullmq";
import {redisConnection} from "@/config/redis";

/** Constant name identifying the reservation cancellation background queue. */
export const RESERVATION_CANCELLATION_QUEUE_NAME = "reservation-cancellation";

/** BullMQ queue instance configured for processing reservation cancellation operations. */
export const reservationCancellationQueue = new Queue(
    RESERVATION_CANCELLATION_QUEUE_NAME,
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