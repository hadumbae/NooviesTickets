/**
 * @fileoverview BullMQ worker for processing reservation lifecycle background jobs.
 */

import {Worker, type Job} from "bullmq";
import {redisConnection} from "@/config/redis";
import {
    RESERVATION_LIFECYCLE_QUEUE_NAME
} from "@/domains/reservations/_feat/reservation-queues/lifecycle/reservationLifecycleQueue";
import type {ObjectIdString} from "@noovies-tickets/common";
import {ReservationModel} from "@/domains/reservations";

/** Type representing available reservation lifecycle background job names. */
export type ReservationLifecycleJobName = "payment_expiry";

/** BullMQ worker instance that handles lifecycle events and expirations for reservations. */
export const reservationLifecycleWorker = new Worker(
    RESERVATION_LIFECYCLE_QUEUE_NAME,
    async ({data, name}: Job<{reservationId: ObjectIdString}, unknown, ReservationLifecycleJobName>) => {
        const {reservationId} = data;

        const reservation =  await ReservationModel.findById(reservationId);
        if (!reservation) return;

        const {status, expiresAt} = reservation;

        if (name === "payment_expiry" && status == "RESERVED" && (Date.now() >= expiresAt.getTime())) {
            reservation.status = "EXPIRED";
            reservation.dateExpired = new Date();

            await reservation.save();
            return;
        }
    },
    {connection: redisConnection},
);

reservationLifecycleWorker.on("failed", (job, error) => {
    console.warn(`[${RESERVATION_LIFECYCLE_QUEUE_NAME}] Job ${job?.id} Failed: `, error.message);
});

reservationLifecycleWorker.on("error", (error) => {
    console.error(`[${RESERVATION_LIFECYCLE_QUEUE_NAME}] Worker Encountered Error: `, error.message);
});