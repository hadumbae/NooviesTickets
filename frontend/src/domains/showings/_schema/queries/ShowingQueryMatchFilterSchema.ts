/**
 * @fileoverview Zod schema and TypeScript type for Showing match filters.
 */

import {z} from "zod";
import {
    BooleanValueSchema,
    IDStringSchema,
    preprocessOptionalField,
    preprocessToBoolean,
    ShowingStatusSchema
} from "@noovies-tickets/common";

/** Zod schema for validating match-based filter criteria for Showings. */
export const ShowingQueryMatchFilterSchema = z.object({
    movie: preprocessOptionalField(IDStringSchema),
    theatre: preprocessOptionalField(IDStringSchema),
    screen: preprocessOptionalField(IDStringSchema),
    isSpecialEvent: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
    isActive: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
    status: preprocessOptionalField(ShowingStatusSchema),
});

/** Match-based filter criteria for querying Showings. */
export type ShowingQueryMatchFilters =
    z.infer<typeof ShowingQueryMatchFilterSchema>;