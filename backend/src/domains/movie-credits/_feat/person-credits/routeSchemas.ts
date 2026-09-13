/**
 * @fileoverview Route validation schemas for person filmography and credit
 * statistics.
 */

import {z} from "zod";
import {ObjectIdSchema} from "@/shared/schema/mongoose/ObjectIdSchema";
import {NonNegativeNumberSchema} from "@noovies-tickets/common";
import {preprocessToNumber} from "@noovies-tickets/common";

/**
 * Validation schema for the fetchPersonCreditStats route parameters.
 */
export const FetchPersonCreditStatsRouteConfigSchema = z.object({
    personID: ObjectIdSchema,
});

/**
 * Inferred type for person credit statistics route configuration.
 */
export type FetchPersonCreditStatsRouteConfig = z.infer<typeof FetchPersonCreditStatsRouteConfigSchema>;

/**
 * Validation schema for the fetchPersonFilmography route parameters and query strings.
 */
export const FetchPersonFilmographyRouteConfigSchema = z.object({
    personID: ObjectIdSchema,
    limit: preprocessToNumber(NonNegativeNumberSchema.optional()).optional(),
});

/**
 * Inferred type for person filmography route configuration.
 */
export type FetchPersonFilmographyRouteConfig = z.infer<typeof FetchPersonFilmographyRouteConfigSchema>;