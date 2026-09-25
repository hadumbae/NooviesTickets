/**
 * @fileoverview BullMQ worker for processing reservation cancellation background jobs.
 */

import {type Job, Worker} from "bullmq";
import {
    RESERVATION_CANCELLATION_QUEUE_NAME
} from "@/domains/reservations/_feat/reservation-queues/cancellation/reservationCancellationQueue";
import type {ObjectIdString} from "@noovies-tickets/common";
import {ReservationModel} from "@/domains/reservations";
import {redisConnection} from "@/config/redis";
import {removeReservationLifecycleJob} from "@/domains/reservations/_feat/reservation-queues";

/** Type representing available reservation cancellation background job names. */
export type ReservationCancellationJobName = "cancellation";

/** BullMQ worker instance that handles cancellation events and status updates for reservations. */
export const reservationCancellationWorker = new Worker(
    RESERVATION_CANCELLATION_QUEUE_NAME,
    async ({name, data: {reservationId}}: Job<{
        reservationId: ObjectIdString
    }, unknown, ReservationCancellationJobName>) => {
        const reservation = await ReservationModel.findById(reservationId);
        if (!reservation) return;

        const {status} = reservation;

        if (name === "cancellation" && (status == "RESERVED" || status == "PAID")) {
            reservation.status = "CANCELLED";
            reservation.dateCancelled = new Date();

            await reservation.save();

            try {
                await removeReservationLifecycleJob({_id: reservation._id, job: "payment_expiry"});
            } catch (e) {
                console.error(`[${RESERVATION_CANCELLATION_QUEUE_NAME}] Failed to Clear Lifecycle Job For ${reservation._id}:`, e);
            }

            console.log(`[${RESERVATION_CANCELLATION_QUEUE_NAME}] Reservation ${reservationId} -> CANCELLED`);
            return;
        }
    },
    {connection: redisConnection, stalledInterval: 60 * 60 * 1000}
);

reservationCancellationWorker.on("failed", (job, error) => {
    console.warn(`[${RESERVATION_CANCELLATION_QUEUE_NAME}] Job ${job?.id} Failed: `, error.message);
});

reservationCancellationWorker.on("error", (error) => {
    console.error(`[${RESERVATION_CANCELLATION_QUEUE_NAME}] Worker Encountered Error: `, error.message);
});