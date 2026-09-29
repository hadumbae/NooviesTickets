/**
 * @fileoverview Validation schema and type for the SEAT_LOCKED socket event payload.
 */

import {z} from "zod";
import {IDStringSchema} from "../../../schema/additional-strings/id-strings/IDStringSchema";

/** Zod schema for the payload broadcast when a seat is locked for a showing. */
export const SeatLockedPayloadSchema = z.object({
    showingId: IDStringSchema,
    seatId: IDStringSchema,
});

/** TypeScript type inferred from the SeatLockedPayloadSchema. */
export type SeatLockedPayload = z.infer<typeof SeatLockedPayloadSchema>;
