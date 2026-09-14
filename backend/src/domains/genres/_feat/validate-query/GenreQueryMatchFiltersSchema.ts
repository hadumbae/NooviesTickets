/**
 * @fileoverview Zod schema and inferred type for direct genre field matching from URL parameters.
 */

import {z} from "zod";
import {BooleanValueSchema, preprocessOptionalField, preprocessToBoolean, TrimmedStringSchema} from "@noovies-tickets/common";

/** Schema for validating raw filterable URL query fields for genres. */
export const GenreQueryMatchFiltersSchema = z.object({
    name: preprocessOptionalField(TrimmedStringSchema),
    isFeatured: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
});

/** Inferred type for raw genre filter parameters. */
export type GenreQueryMatchFilters = z.infer<typeof GenreQueryMatchFiltersSchema>;
