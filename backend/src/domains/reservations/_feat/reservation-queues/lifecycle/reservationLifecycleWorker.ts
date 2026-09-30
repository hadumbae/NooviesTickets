/**
 * @fileoverview BullMQ worker for processing reservation lifecycle background jobs.
 */

import {type Job, Worker} from "bullmq";
import {redisConnection} from "@/config/redis";
import {
    RESERVATION_LIFECYCLE_QUEUE_NAME
} from "@/domains/reservations/_feat/reservation-queues/lifecycle/reservationLifecycleQueue";
import type {ObjectIdString} from "@noovies-tickets/common";
import {ReservationModel} from "@/domains/reservations";
import {ShowingModel} from "@/domains/showings";
import {emitReservationStatusChanged} from "@/domains/reservations/_feat/socket-io";

/** Type representing available reservation lifecycle background job names. */
export type ReservationLifecycleJobName = "payment_expiry" | "showing_running" | "showing_completed";

/** BullMQ worker instance that handles lifecycle events and expirations for reservations. */
export const reservationLifecycleWorker = new Worker(
    RESERVATION_LIFECYCLE_QUEUE_NAME,
    async ({data, name}: Job<{ reservationId: ObjectIdString }, unknown, ReservationLifecycleJobName>) => {
        const {reservationId} = data;

        const reservation = await ReservationModel.findById(reservationId);
        if (!reservation) return;

        const showing = await ShowingModel.findById(reservation.showing);
        if (!showing) return;

        const {status, expiresAt} = reservation;
        const {startTime} = showing;

        const now = Date.now();

        if (
            name === "payment_expiry" && status == "RESERVED" &&
            (now >= expiresAt.getTime() || now >= startTime.getTime())
        ) {
            reservation.status = "EXPIRED";
            reservation.dateExpired = new Date();

            await reservation.save();

            emitReservationStatusChanged({
                reservationId: reservation._id.toString(),
                reservationSlug: reservation.slug,
                showingId: showing._id.toString(),
                status: "EXPIRED",
            });

            console.log(`[${RESERVATION_LIFECYCLE_QUEUE_NAME}] Reservation ${reservationId} -> EXPIRED`);
            return;
        }

        if (name === "showing_running") {
            if (status === "RESERVED") {
                reservation.status = "EXPIRED";
                reservation.dateExpired = new Date();

                await reservation.save();

                emitReservationStatusChanged({
                    reservationId: reservation._id.toString(),
                    reservationSlug: reservation.slug,
                    showingId: showing._id.toString(),
                    status: "EXPIRED",
                });

                console.log(`[${RESERVATION_LIFECYCLE_QUEUE_NAME}] Reservation ${reservationId} -> EXPIRED`);
                return;
            }

            if (status === "PAID") {
                reservation.status = "RUNNING";
                reservation.dateRunning = new Date();

                await reservation.save();

                emitReservationStatusChanged({
                    reservationId: reservation._id.toString(),
                    reservationSlug: reservation.slug,
                    showingId: showing._id.toString(),
                    status: "RUNNING",
                });

                console.log(`[${RESERVATION_LIFECYCLE_QUEUE_NAME}] Reservation ${reservationId} -> RUNNING`);
                return;
            }
        }

        if (name === "showing_completed" && status == "RUNNING") {
            reservation.status = "COMPLETED";
            reservation.dateCompleted = new Date();

            await reservation.save();

            emitReservationStatusChanged({
                reservationId: reservation._id.toString(),
                reservationSlug: reservation.slug,
                showingId: showing._id.toString(),
                status: "COMPLETED",
            });

            console.log(`[${RESERVATION_LIFECYCLE_QUEUE_NAME}] Reservation ${reservationId} -> COMPLETED`);
            return;
        }
    },
    {connection: redisConnection, stalledInterval: 30 * 60 * 1000},
);

reservationLifecycleWorker.on("failed", (job, error) => {
    console.warn(`[${RESERVATION_LIFECYCLE_QUEUE_NAME}] Job ${job?.id} Failed: `, error.message);
});

reservationLifecycleWorker.on("error", (error) => {
    console.error(`[${RESERVATION_LIFECYCLE_QUEUE_NAME}] Worker Encountered Error: `, error.message);
});