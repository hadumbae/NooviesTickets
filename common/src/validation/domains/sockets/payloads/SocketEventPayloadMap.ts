/**
 * @fileoverview Maps each socket event name to its corresponding payload schema and type.
 */

import {z} from "zod";
import {ReservationStatusChangedPayloadSchema} from "./ReservationStatusChangedPayloadSchema";
import {ShowingStatusChangedPayloadSchema} from "./ShowingStatusChangedPayloadSchema";

/** Lookup of every socket event name to the schema validating its payload. */
export const SocketEventPayloadSchemas = {
    RESERVATION_STATUS_CHANGED: ReservationStatusChangedPayloadSchema,
    SHOWING_STATUS_CHANGED: ShowingStatusChangedPayloadSchema,
} as const;

/** Maps each socket event name to its inferred payload type, for use by emitters and listeners alike. */
export type SocketEventPayloadMap = {
    [K in keyof typeof SocketEventPayloadSchemas]: z.infer<typeof SocketEventPayloadSchemas[K]>;
};
