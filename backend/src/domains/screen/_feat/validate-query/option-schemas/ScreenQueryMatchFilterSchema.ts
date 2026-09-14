/**
 * @fileoverview Validation schema for filtering Screen entities in database queries.
 */

import {z} from "zod";
import {ObjectIdSchema} from "@/shared/_schema/mongoose/ObjectIdSchema";
import {
    PositiveNumberSchema,
    preprocessOptionalField,
    preprocessToNumber,
    ScreenTypeSchema,
    TrimmedStringSchema
} from "@noovies-tickets/common";

/**
 * Zod schema for matching/filtering Screen documents via URL parameters.
 */
export const ScreenQueryMatchFilterSchema = z.object({
    _id: ObjectIdSchema.optional(),
    name: preprocessOptionalField(TrimmedStringSchema),
    theatre: ObjectIdSchema.optional(),
    capacity: preprocessToNumber(PositiveNumberSchema.optional()).optional(),
    screenType: ScreenTypeSchema.optional(),
});

/**
 * TypeScript type inferred from the ScreenQueryMatchFilterSchema.
 */
export type ScreenQueryMatchFilters = z.infer<typeof ScreenQueryMatchFilterSchema>;
