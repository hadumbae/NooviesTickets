/**
 * @fileoverview Business logic for a client-initiated reservation cancellation.
 */

import {Types} from "mongoose";
import type {ShowingSchemaFields} from "@/domains/showings/_models/showing/Showing.types";
import {SeatMapModel} from "@/domains/seatmaps/_models/seat-map/SeatMap.model";
import {
    assertReservationExists,
    assertReservationOwnership
} from "@/domains/reservations/_feat/assert-reservations";
import type {DocumentType} from "@/shared/_types/mongoose/DocumentType";
import type {ReservationSchemaFields} from "@/domains/reservations/_models/reservation";

/** Identifiers required to securely scope a cancellation request. */
export type CancelClientReservationParams = {
    userID: Types.ObjectId;
    reservationID: Types.ObjectId;
};

/**
 * Orchestrates the cancellation of a reservation and release of inventory.
 */
export async function cancelClientReservation(
    {userID, reservationID}: CancelClientReservationParams
): Promise<DocumentType<ReservationSchemaFields>> {
    const reservation = await assertReservationExists(reservationID);
    assertReservationOwnership({userID, reservation});

    const {status: resStatus, reservationType: resType, selectedSeating} = reservation;

    if (resStatus === "CANCELLED") return reservation;

    if (resStatus === "RESERVED" || resStatus === "PAID") {
        if (resType === "RESERVED_SEATS") {
            await reservation.populate("showing");
            const populatedShowing = reservation.showing as unknown as ShowingSchemaFields;

            if (populatedShowing.status === "SCHEDULED" || populatedShowing.status === "SOLD_OUT") {
                await SeatMapModel.updateMany(
                    {_id: {$in: selectedSeating}},
                    {reservation: null, status: "AVAILABLE"}
                );
            }
        }

        reservation.status = "CANCELLED";
        reservation.dateCancelled = new Date();

        await reservation.save();
    }

    return reservation;
}
