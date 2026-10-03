/**
 * @fileoverview Handler for General Admission ticket reservations.
 */

import {fetchPopulatedShowing} from "@/domains/showings/_feat/fetch-showings/fetchPopulatedShowing";
import {BookingError} from "@/shared/_errors/reservations/BookingError";
import {TheatreSeatModel} from "@/domains/theatre-seats/_models";
import {ReservationModel, type ReservationSchemaFields} from "@/domains/reservations/_models/reservation";
import type {ReserveTicketPersistenceData} from "@/domains/reservations/_feat/reserve-tickets/ticket-service/persistenceSchema";
import {saveTicketReservation} from "@/domains/reservations/_feat/reserve-tickets/ticket-service/saveTicketReservation";

/** Persistence data constrained to General Admission logic. */
export type ReserveGeneralTicketData = Extract<ReserveTicketPersistenceData, { reservationType: "GENERAL_ADMISSION" }>;

/**
 * Logic for General Admission (GA) bookings.
 * @throws {BookingError} 409 - If total requested tickets exceed remaining screen capacity.
 */
export async function reserveGeneralAdmissionTickets(data: ReserveGeneralTicketData): Promise<ReservationSchemaFields> {
    const {showing: showingID, ticketCount: seatsToReserve} = data;
    const {ticketPrice, screen: {_id: screenID}} = await fetchPopulatedShowing(showingID);

    const totalScreenSeats = await TheatreSeatModel.countDocuments({
        screen: screenID,
        layoutType: "SEAT",
    });

    if (totalScreenSeats === 0) {
        throw new BookingError({
            statusCode: 409,
            errorCode: "ERR_SCREEN_FULL",
            message: "There are no available seats.",
        });
    }

    const reservedCheck = await ReservationModel.aggregate([
        {$match: {showing: showingID, status: "PAID"}},
        {$group: {_id: null, totalAmount: {$sum: "$ticketCount"}}},
    ]);

    const reservedSeats = reservedCheck[0]?.totalAmount ?? 0;
    const hasSeats = totalScreenSeats >= reservedSeats + seatsToReserve;

    if (!hasSeats) {
        throw new BookingError({
            statusCode: 409,
            errorCode: "ERR_SCREEN_FULL",
            message: "There are no available seats.",
        });
    }

    data.pricePaid = ticketPrice * seatsToReserve;

    return saveTicketReservation(data);
}
