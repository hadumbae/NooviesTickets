/**
 * @fileoverview Validation schema for filtering Theatre entities in database queries.
 * Integrates fuzzy regex matching and standardized location schemas.
 */

import {z} from "zod";
import {
    IANATimezoneSchema,
    ISO3166Alpha2CountryCodeSchema,
    NonNegativeNumberSchema,
    preprocessOptionalField,
    preprocessToNumber,
    TrimmedStringSchema
} from "@noovies-tickets/common";
import {URLParamRegexPatternSchema} from "@/shared/_feat/parse-query-string";

/**
 * Zod schema defining the available match filters for Theatre queries.
 */
export const TheatreQueryMatchFilterSchema = z.object({
    name: URLParamRegexPatternSchema,
    seatCapacity: preprocessToNumber(NonNegativeNumberSchema.optional()).optional(),
    street: URLParamRegexPatternSchema,
    city: URLParamRegexPatternSchema,
    state: URLParamRegexPatternSchema,
    country: ISO3166Alpha2CountryCodeSchema.optional(),
    postalCode: preprocessOptionalField(TrimmedStringSchema),
    timezone: IANATimezoneSchema.optional(),
});

/**
 * TypeScript type inferred from TheatreQueryMatchFilterSchema.
 */
export type TheatreQueryMatchFilters = z.infer<typeof TheatreQueryMatchFilterSchema>;
