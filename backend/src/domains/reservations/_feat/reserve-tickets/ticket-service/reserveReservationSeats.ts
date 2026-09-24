import {SeatMapModel} from "@/domains/seatmaps/_models/seat-map/SeatMap.model";
import {BookingError} from "@/shared/_errors/reservations/BookingError";
import type {DocumentType} from "@/shared/_types/mongoose/DocumentType";
import {ReservationModel, type ReservationSchemaFields} from "@/domains/reservations/_models/reservation";

/** Finalizes seat status from pending to reserved for a specific reservation. */
export async function reserveReservationSeats(
    {_id, selectedSeating, reservationType}: DocumentType<ReservationSchemaFields>
): Promise<void> {
    if (reservationType === "GENERAL_ADMISSION") {
        return;
    }

    const seatsToReserve = selectedSeating!.map(({_id}) => _id);

    const {modifiedCount: reservedCount} = await SeatMapModel.updateMany(
        {_id: {$in: seatsToReserve}, status: "PENDING"},
        {reservation: _id, status: "RESERVED"},
    );

    if (seatsToReserve.length !== reservedCount) {
        await SeatMapModel.updateMany(
            {reservation: _id},
            {reservation: null, status: "AVAILABLE"}
        );

        await ReservationModel.findByIdAndUpdate(_id, {
            status: "INVALID",
            notes: "Seat(s) already reserved.",
        });

        throw new BookingError({
            statusCode: 409,
            errorCode: "ERR_SEAT_RESERVED",
            message: "Seat(s) already reserved.",
        });
    }
}