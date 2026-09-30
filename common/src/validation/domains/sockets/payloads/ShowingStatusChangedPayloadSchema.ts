/**
 * @fileoverview Validation schema and type for the SHOWING_STATUS_CHANGED socket event payload.
 */

import {z} from "zod";
import {SlugStringSchema} from "../../../../validation/schema";
import {ZodEnumParamHandler} from "../../../schema/enums/handler/ZodEnumParamHandler";
import {IDStringSchema} from "../../../schema/additional-strings/id-strings/IDStringSchema";

/**
 * Subset of ShowingStatusConstant that clients need to react to in real time.
 * Deliberately excludes statuses (e.g. SCHEDULED, CANCELLED, SOLD_OUT) that
 * aren't produced by the showing expiry worker's transitions.
 */
const BroadcastShowingStatusConstant = [
    "RUNNING",
    "COMPLETED",
] as const;

/** Zod schema for the payload broadcast when a showing's status changes. */
export const ShowingStatusChangedPayloadSchema = z.object({
    showingId: IDStringSchema,
    showingSlug: SlugStringSchema,
    status: z.enum(BroadcastShowingStatusConstant, ZodEnumParamHandler({
        invalidType: "Must be a valid showing status string.",
        invalidValue: "Must be a valid broadcastable showing status."
    })),
});

/** TypeScript type inferred from the ShowingStatusChangedPayloadSchema. */
export type ShowingStatusChangedPayload = z.infer<typeof ShowingStatusChangedPayloadSchema>;
