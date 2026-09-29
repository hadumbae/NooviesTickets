/**
 * @fileoverview Validation schema and type for the SEAT_RELEASED socket event payload.
 */

import {z} from "zod";
import {IDStringSchema} from "../../../schema/additional-strings/id-strings/IDStringSchema";

/** Zod schema for the payload broadcast when a seat is released for a showing. */
export const SeatReleasedPayloadSchema = z.object({
    showingId: IDStringSchema,
    seatId: IDStringSchema,
});

/** TypeScript type inferred from the SeatReleasedPayloadSchema. */
export type SeatReleasedPayload = z.infer<typeof SeatReleasedPayloadSchema>;
