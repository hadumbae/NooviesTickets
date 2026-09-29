/**
 * @fileoverview Broadcasts a reservation's status change to clients watching its showing and clients watching the reservation itself.
 */

import type {SocketEventPayloadMap} from "@noovies-tickets/common";
import {emitToRooms} from "@/server/registerSocketServer";

/** Parameters for broadcasting a reservation's status change. */
export type EmitReservationStatusChangedParams = {
    reservationId: string;
    showingId: string;
    status: SocketEventPayloadMap["RESERVATION_STATUS_CHANGED"]["status"];
};

/** Emits a RESERVATION_STATUS_CHANGED event to the reservation's showing room and the reservation's own room. */
export function emitReservationStatusChanged(
    {reservationId, showingId, status}: EmitReservationStatusChangedParams,
): void {
    emitToRooms([showingId, reservationId], "RESERVATION_STATUS_CHANGED", {reservationId, showingId, status});
}
