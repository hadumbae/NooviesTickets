/**
 * @fileoverview Broadcasts a showing's status change to every client watching that showing.
 */

import type {SocketEventPayloadMap} from "@noovies-tickets/common";
import {emitToRooms} from "@/server/registerSocketServer";

/** Emits a SHOWING_STATUS_CHANGED event to every socket in the given showing's room. */
export function emitShowingStatusChanged(
    showingId: string,
    status: SocketEventPayloadMap["SHOWING_STATUS_CHANGED"]["status"],
): void {
    emitToRooms([showingId], "SHOWING_STATUS_CHANGED", {showingId, status});
}
