/**
 * @fileoverview Validation schema for reference-based filtering of Seat entities.
 * These filters resolve relationships through associated Showing, Theatre, and Screen entities.
 */

import {z} from "zod";
import {ObjectIdSchema} from "@/shared/_schema/mongoose/ObjectIdSchema";
import {preprocessOptionalField, TrimmedStringSchema} from "@noovies-tickets/common";

/**
 * Zod schema defining reference filters for Seat queries.
 */
export const SeatQueryReferenceFilterSchema = z.object({
    showing: ObjectIdSchema.optional(),
    showingSlug: ObjectIdSchema.optional(),
    theatreSlug: preprocessOptionalField(TrimmedStringSchema),
    screenSlug: preprocessOptionalField(TrimmedStringSchema),
});

/**
 * TypeScript type inferred from SeatQueryReferenceFilterSchema.
 */
export type SeatQueryReferenceFilters = z.infer<typeof SeatQueryReferenceFilterSchema>;
