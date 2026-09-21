/**
 * @fileoverview Redis connection instance shared by BullMQ queues and workers.
 */

import IORedis from "ioredis";

/** Shared IORedis connection instance configured with BullMQ requirements. */
export const redisConnection = new IORedis(
    process.env.REDIS_CONNECT_STRING!,
    {maxRetriesPerRequest: null}
);