/**
 * @fileoverview Zod schema and type definitions for filtering Theatre Screen queries.
 * Provides a standardized way to define search criteria for fetching screens.
 */

import {z} from "zod";
import {
    IDStringSchema,
    PositiveNumberSchema,
    preprocessOptionalField,
    preprocessToNumber,
    TheatreScreenNameSchema,
    TheatreScreenTypeSchema
} from "@noovies-tickets/common";

/**
 * Zod schema for validating screen query filters.
 */
export const TheatreScreenQueryMatchFiltersSchema = z.object({
    _id: preprocessOptionalField(IDStringSchema),
    name: preprocessOptionalField(TheatreScreenNameSchema),
    theatre: preprocessOptionalField(IDStringSchema),
    capacity: preprocessToNumber(PositiveNumberSchema.optional()).optional(),
    screenType: preprocessOptionalField(TheatreScreenTypeSchema),
});

/**
 * TypeScript type for Theatre Screen query filters.
 */
export type TheatreScreenQueryFilters = z.infer<typeof TheatreScreenQueryMatchFiltersSchema>;