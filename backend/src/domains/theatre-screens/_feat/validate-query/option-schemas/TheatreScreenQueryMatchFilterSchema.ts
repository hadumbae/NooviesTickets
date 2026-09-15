/**
 * @fileoverview Validation schema for filtering TheatreScreen entities in database queries.
 */

import {z} from "zod";
import {ObjectIdSchema} from "@/shared/_schema/mongoose/ObjectIdSchema";
import {
    PositiveNumberSchema,
    preprocessOptionalField,
    preprocessToNumber,
    TheatreScreenTypeSchema,
    TrimmedStringSchema
} from "@noovies-tickets/common";

/**
 * Zod schema for matching/filtering TheatreScreen documents via URL parameters.
 */
export const TheatreScreenQueryMatchFilterSchema = z.object({
    _id: ObjectIdSchema.optional(),
    name: preprocessOptionalField(TrimmedStringSchema),
    theatre: ObjectIdSchema.optional(),
    capacity: preprocessToNumber(PositiveNumberSchema.optional()).optional(),
    screenType: TheatreScreenTypeSchema.optional(),
});

/**
 * TypeScript type inferred from the TheatreScreenQueryMatchFilterSchema.
 */
export type TheatreScreenQueryMatchFilters = z.infer<typeof TheatreScreenQueryMatchFilterSchema>;
