/**
 * @fileoverview Maps each socket event name to its corresponding payload schema and type.
 */

import {z} from "zod";
import {SeatLockedPayloadSchema} from "./SeatLockedPayloadSchema";
import {SeatReleasedPayloadSchema} from "./SeatReleasedPayloadSchema";
import {ReservationStatusChangedPayloadSchema} from "./ReservationStatusChangedPayloadSchema";
import {ShowingExpiredPayloadSchema} from "./ShowingExpiredPayloadSchema";

/** Lookup of every socket event name to the schema validating its payload. */
export const SocketEventPayloadSchemas = {
    SEAT_LOCKED: SeatLockedPayloadSchema,
    SEAT_RELEASED: SeatReleasedPayloadSchema,
    RESERVATION_STATUS_CHANGED: ReservationStatusChangedPayloadSchema,
    SHOWING_EXPIRED: ShowingExpiredPayloadSchema,
} as const;

/** Maps each socket event name to its inferred payload type, for use by emitters and listeners alike. */
export type SocketEventPayloadMap = {
    [K in keyof typeof SocketEventPayloadSchemas]: z.infer<typeof SocketEventPayloadSchemas[K]>;
};
