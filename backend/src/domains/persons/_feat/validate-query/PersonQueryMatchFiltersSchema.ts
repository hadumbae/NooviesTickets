/**
 * @fileoverview Validation schema and types for Person query filtering.
 */

import {z} from "zod";
import {ObjectIdSchema} from "@/shared/schema/mongoose/ObjectIdSchema";
import {DateOnlyInstanceSchema, ISO3166Alpha2CountryCodeSchema} from "@noovies-tickets/common";
import {URLParamRegexPatternSchema} from "@/shared/_feat/parse-query-string";

/**
 * Validates filtering criteria for Person queries.
 */
export const PersonQueryMatchFiltersSchema = z.object({
    _id: ObjectIdSchema.optional(),
    name: URLParamRegexPatternSchema,
    dob: DateOnlyInstanceSchema.optional(),
    nationality: ISO3166Alpha2CountryCodeSchema.optional(),
});

/**
 * Type representing validated filters for Person document queries.
 */
export type PersonQueryMatchFilters = z.infer<typeof PersonQueryMatchFiltersSchema>;
