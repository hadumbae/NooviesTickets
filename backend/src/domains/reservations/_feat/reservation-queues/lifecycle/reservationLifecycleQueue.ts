/**
 * @fileoverview BullMQ queue instance configuration for managing reservation lifecycle background jobs.
 */

import {Queue} from "bullmq";
import {redisConnection} from "@/config/redis";

/** Constant name identifying the reservation lifecycle background queue. */
export const RESERVATION_LIFECYCLE_QUEUE_NAME = "reservation-lifecycle";

/** BullMQ queue instance configured for processing reservation lifecycle operations. */
export const reservationLifecycleQueue = new Queue(
    RESERVATION_LIFECYCLE_QUEUE_NAME,
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