/**
 * @fileoverview Validation schema for filtering TheatreScreen entities in database queries.
 */

import {z} from "zod";
import {ObjectIdSchema} from "@/shared/_schema/mongoose/ObjectIdSchema";
import {
    PositiveNumberSchema,
    preprocessOptionalField,
    preprocessToNumber,
    TheatreScreenNameSchema,
    TheatreScreenTypeSchema
} from "@noovies-tickets/common";

/**
 * Zod schema for matching/filtering TheatreScreen documents via URL parameters.
 */
export const TheatreScreenQueryMatchFilterSchema = z.object({
    _id: preprocessOptionalField(ObjectIdSchema),
    name: preprocessOptionalField(TheatreScreenNameSchema),
    theatre: preprocessOptionalField(ObjectIdSchema),
    capacity: preprocessToNumber(PositiveNumberSchema.optional()).optional(),
    screenType: preprocessOptionalField(TheatreScreenTypeSchema),
});

/**
 * TypeScript type inferred from the TheatreScreenQueryMatchFilterSchema.
 */
export type TheatreScreenQueryMatchFilters = z.infer<typeof TheatreScreenQueryMatchFilterSchema>;
