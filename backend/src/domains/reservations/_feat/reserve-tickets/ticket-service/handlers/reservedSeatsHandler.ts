/**
 * @fileoverview Handler for Reserved Seating ticket reservations.
 */

import {BookingError} from "@/shared/_errors/reservations/BookingError";
import {SeatMapModel} from "@/domains/seatmaps/_models/seat-map/SeatMap.model";
import type {SeatMapSchemaFields} from "@/domains/seatmaps/_models/seat-map/SeatMap.types";
import type {ReservationSchemaFields} from "@/domains/reservations/_models/reservation";
import type {ReserveTicketPersistenceData} from "@/domains/reservations/_feat/reserve-tickets/ticket-service/persistenceSchema";
import {saveTicketReservation} from "@/domains/reservations/_feat/reserve-tickets/ticket-service/saveTicketReservation";

/** Persistence data constrained to Reserved Seating logic. */
export type ReserveSeatTicketData = Extract<ReserveTicketPersistenceData, { reservationType: "RESERVED_SEATS" }>;

/**
 * Logic for Reserved Seating bookings using MongoDB transactions.
 * @throws {BookingError} 409 - If any requested seat is not 'AVAILABLE'.
 */
export async function reserveSeatedTickets(data: ReserveSeatTicketData): Promise<ReservationSchemaFields> {
    const {selectedSeating} = data;
    const session = await SeatMapModel.startSession();
    let seating: SeatMapSchemaFields[] = [];

    try {
        seating = await session.withTransaction(async () => {
            const {modifiedCount: heldSeats} = await SeatMapModel.updateMany(
                {_id: {$in: selectedSeating}, status: "AVAILABLE"},
                {status: "PENDING"}
            );

            if (heldSeats !== selectedSeating.length) {
                await SeatMapModel.updateMany(
                    {_id: {$in: selectedSeating}, status: "PENDING"},
                    {status: "AVAILABLE"}
                );

                throw new BookingError({
                    statusCode: 409,
                    message: "Seat(s) already reserved.",
                    errorCode: "ERR_SEAT_RESERVED",
                });
            }

            return SeatMapModel
                .find({_id: {$in: selectedSeating}, status: "PENDING"})
                .populate(["seat"])
                .lean();
        });
    } catch (error: unknown) {
        if (error instanceof BookingError) throw error;
        throw new BookingError({
            statusCode: 500,
            message: "An unknown error occurred trying to reserve seats.",
            errorCode: "ERR_UNKNOWN_ERROR",
        });
    } finally {
        await session.endSession();
    }

    data.pricePaid = seating
        .map(({overridePrice, basePrice, priceMultiplier}) => overridePrice ?? basePrice * priceMultiplier)
        .reduce((acc, cur) => acc + cur, 0);

    return saveTicketReservation(data);
}
