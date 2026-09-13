/**
 * @fileoverview Zod schema and type definitions for filtering Theatre Screen queries.
 * Provides a standardized way to define search criteria for fetching screens.
 */

import {z} from "zod";
import {IDStringSchema, NonNegativeNumberSchema} from "@noovies-tickets/common";
import {NonEmptyStringSchema} from "@/common/_schemas";
import {ScreenTypeSchema} from "@/domains/theatre-screens/_schema/fields";

/**
 * Zod schema for validating screen query filters.
 */
export const TheatreScreenQueryMatchFiltersSchema = z.object({
    _id: IDStringSchema.optional(),
    name: NonEmptyStringSchema.optional(),
    theatre: IDStringSchema.optional(),
    capacity: NonNegativeNumberSchema.optional(),
    screenType: ScreenTypeSchema.optional(),
});

/**
 * TypeScript type for Theatre Screen query filters.
 */
export type TheatreScreenQueryFilters = z.infer<typeof TheatreScreenQueryMatchFiltersSchema>;