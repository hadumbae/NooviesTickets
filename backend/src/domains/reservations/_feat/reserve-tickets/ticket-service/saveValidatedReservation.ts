/**
 * @fileoverview Service for validating and persisting reservation data to the database.
 */

import {ReservationPopulatePaths} from "@/domains/reservations/_feat/query-population/ReservationPopulatePaths";
import {ValidationError} from "@noovies-tickets/common";
import {ReservationModel} from "@/domains/reservations/_models/reservation/Reservation.model";
import {type ReservationSchemaFields} from "@/domains/reservations/_models/reservation/Reservation.types";
import {
    type ReserveTicketPersistenceData,
    ReserveTicketPersistenceSchema
} from "@/domains/reservations/_feat/reserve-tickets/schemas/persistenceSchema";

/** Validates the input data against the persistence schema before saving and populating the reservation document. */
export async function saveValidatedReservation(
    data: ReserveTicketPersistenceData
): Promise<ReservationSchemaFields> {
    const {data: parsedData, success, error} = ReserveTicketPersistenceSchema.safeParse(data);

    if (!success) {
        throw new ValidationError({
            raw: data,
            errorCode: "ERR_QUERY_VALIDATION",
            message: "Failed to parse ticket checkout input data.",
            errors: error?.errors,
            statusCode: 422,
        });
    }

    const doc = new ReservationModel(parsedData);
    await doc.save();

    await doc.populate(ReservationPopulatePaths);

    return doc;
}