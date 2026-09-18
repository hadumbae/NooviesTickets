/**
 * @fileoverview Validation schema for filtering Theatre entities in database queries.
 * Integrates fuzzy regex matching and standardized location schemas.
 */

import {z} from "zod";
import {ObjectIdSchema} from "@/shared/_schema/mongoose/ObjectIdSchema";
import {URLParamRegexPatternSchema} from "@/shared/_feat/parse-query-string/URLParamRegexPatternSchema";
import {
    IANATimezoneSchema,
    ISO3166Alpha2CountryCodeSchema,
    NonNegativeNumberSchema,
    PostalCodeSchema,
    preprocessOptionalField,
    preprocessToNumber
} from "@noovies-tickets/common";

/**
 * Zod schema defining the available match filters for Theatre queries.
 */
export const TheatreQueryMatchFilterSchema = z.object({
    _id: preprocessOptionalField(ObjectIdSchema),
    name: URLParamRegexPatternSchema,
    seatCapacity: preprocessToNumber(NonNegativeNumberSchema.optional()).optional(),
    street: URLParamRegexPatternSchema,
    city: URLParamRegexPatternSchema,
    state: URLParamRegexPatternSchema,
    country: preprocessOptionalField(ISO3166Alpha2CountryCodeSchema),
    postalCode: preprocessOptionalField(PostalCodeSchema),
    timezone: preprocessOptionalField(IANATimezoneSchema),
});

/**
 * TypeScript type inferred from TheatreQueryMatchFilterSchema.
 */
export type TheatreQueryMatchFilters = z.infer<typeof TheatreQueryMatchFilterSchema>;
