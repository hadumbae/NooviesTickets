/**
 * @fileoverview Validation schema for domain-specific query parameters in the TheatreScreen domain.
 */

import {z} from "zod";
import {NonNegativeNumberSchema, preprocessToNumber} from "@noovies-tickets/common";

/**
 * Zod schema for auxiliary TheatreScreen query parameters.
 */
export const TheatreScreenQueryParamSchema = z.object({
    showingsPerTheatreScreen: preprocessToNumber(NonNegativeNumberSchema.optional()).optional(),
});

/**
 * TypeScript type inferred from TheatreScreenQueryParamSchema.
 */
export type TheatreScreenQueryParams = z.infer<typeof TheatreScreenQueryParamSchema>;
