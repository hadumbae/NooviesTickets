/**
 * @fileoverview Service for updating a reservation's administrative notes.
 */

import {Types} from "mongoose";
import createHttpError from "http-errors";
import type {AdminReservation} from "@/domains/reservations/_feat/fetch-customer-reservations/types/AdminReservation";
import {fetchAdminReservationByID} from "@/domains/reservations/_feat/fetch-customer-reservations/utilities";
import type {ReservationNotesInput} from "@/domains/reservations/_feat/update-reservations/update-reservation-notes/schema";

/** Parameters required to execute a reservation notes update operation. */
export type UpdateReservationNotesParams = {
    reservationID: Types.ObjectId;
    data: ReservationNotesInput;
}

/** Updates the administrative notes for a specific reservation. */
export async function updateReservationNotes(
    {reservationID, data}: UpdateReservationNotesParams
): Promise<AdminReservation> {
    const reservation = await fetchAdminReservationByID(reservationID);
    if (!reservation) throw createHttpError(404, "Reservation Not Found!");

    reservation.notes = data.notes ?? null;
    await reservation.save();

    return reservation;
}
