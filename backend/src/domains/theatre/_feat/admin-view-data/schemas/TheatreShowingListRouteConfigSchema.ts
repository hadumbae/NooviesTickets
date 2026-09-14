/**
 * @fileoverview Zod schema and type definitions for theatre showing list route parameters.
 */

import {z} from "zod";
import {NonNegativeNumberSchema, preprocessToNumber, SlugStringSchema} from "@noovies-tickets/common";

/**
 * Schema for validating route configuration and pagination parameters for theatre showings.
 */
export const TheatreShowingListRouteConfigSchema = z.object({
    slug: SlugStringSchema,
    page: preprocessToNumber(NonNegativeNumberSchema.optional()).optional(),
    perPage: preprocessToNumber(NonNegativeNumberSchema.optional()).optional(),
});

/** Configuration for the theatre showing list route. */
export type TheatreShowingListRouteConfig = z.infer<typeof TheatreShowingListRouteConfigSchema>;
