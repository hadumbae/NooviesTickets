/**
 * @fileoverview Orchestration service for initiating and finalizing ticket reservations.
 */

import {Types} from "mongoose";
import {calculateFutureDate} from "@noovies-tickets/common";
import {BookingError} from "@/shared/_errors/reservations/BookingError";
import type {ReservationSchemaFields} from "@/domains/reservations/_models/reservation";
import type {ReserveTicketInputData} from "@/domains/reservations/_feat/reserve-tickets/ticket-service/inputSchema";
import type {ReserveTicketPersistenceData} from "@/domains/reservations/_feat/reserve-tickets/ticket-service/persistenceSchema";
import {
    reserveGeneralAdmissionTickets
} from "@/domains/reservations/_feat/reserve-tickets/ticket-service/handlers/generalAdmissionHandler";
import {
    reserveSeatedTickets
} from "@/domains/reservations/_feat/reserve-tickets/ticket-service/handlers/reservedSeatsHandler";
import {
    addReservationLifecycleJob
} from "@/domains/reservations/_feat/reservation-queues/lifecycle/addReservationLifecycleJob";

/** Parameters for the primary reservation service entry point. */
export type ReserveTicketsParams = {
    userID: Types.ObjectId;
    inputData: ReserveTicketInputData;
};

/** Initiates a ticket reservation hold based on the provided type and identity context. */
export async function reserveTickets(
    {userID, inputData}: ReserveTicketsParams
): Promise<ReservationSchemaFields> {
    const persistenceData: ReserveTicketPersistenceData = {
        ...inputData,
        user: userID,
        status: "RESERVED",
        dateReserved: new Date(),
        /** Default hold period of 1 day. */
        expiresAt: calculateFutureDate({days: 1}),
        pricePaid: 0,
    };

    let reservation;
    const {reservationType} = persistenceData;

    if (reservationType === "GENERAL_ADMISSION") {
        reservation = await reserveGeneralAdmissionTickets(persistenceData);
    } else if (reservationType === "RESERVED_SEATS") {
        reservation = await reserveSeatedTickets(persistenceData);
    } else {
        throw new BookingError({
            statusCode: 409,
            errorCode: "ERR_INVALID_RESERVATION_TYPE",
            message: `Invalid Reservation Type. Received: ${reservationType}`,
        });
    }

    try {
        await addReservationLifecycleJob({
            _id: reservation._id,
            job: "payment_expiry",
            time: reservation.expiresAt,
        });
    } catch (error: unknown) {
        throw new BookingError({
            statusCode: 500,
            errorCode: "ERR_LIFECYCLE_QUEUE_FAILED",
            message: "Ticket Reserved, But Queueing Updates Failed",

        });
    }

    return reservation as ReservationSchemaFields;
}
