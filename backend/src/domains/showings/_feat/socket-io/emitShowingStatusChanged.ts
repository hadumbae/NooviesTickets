/**
 * @fileoverview Broadcasts a showing's status change to every client watching that showing.
 */

import {emitToRooms} from "@/server/registerSocketServer";
import type {ObjectIdString, SlugString, SocketEventPayloadMap} from "@noovies-tickets/common";

/** Emits a SHOWING_STATUS_CHANGED event to every socket in the given showing's room. */
export function emitShowingStatusChanged(
    showingId: ObjectIdString,
    showingSlug: SlugString,
    status: SocketEventPayloadMap["SHOWING_STATUS_CHANGED"]["status"],
): void {
    emitToRooms(
        [showingId],
        "SHOWING_STATUS_CHANGED",
        {showingId, showingSlug, status}
    );
}
