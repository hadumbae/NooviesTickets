/**
 * @fileoverview Validation schema and type for the SHOWING_EXPIRED socket event payload.
 */

import {z} from "zod";
import {IDStringSchema} from "../../../schema/additional-strings/id-strings/IDStringSchema";

/** Zod schema for the payload broadcast when a showing expires. */
export const ShowingExpiredPayloadSchema = z.object({
    showingId: IDStringSchema,
});

/** TypeScript type inferred from the ShowingExpiredPayloadSchema. */
export type ShowingExpiredPayload = z.infer<typeof ShowingExpiredPayloadSchema>;
