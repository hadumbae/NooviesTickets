/**
 * @fileoverview Defines the Zod schema for validating movie search query parameters.
 */

import {z} from "zod";
import generateURLParamArraySchema from "@/shared/utility/schema/url-params/generateURLParamArraySchema";
import {ObjectIdSchema} from "@/shared/schema/mongoose/ObjectIdSchema";
import {
    BooleanValueSchema,
    DateOnlyInstanceSchema,
    ISO3166Alpha2CountryCodeSchema,
    preprocessToBoolean
} from "@noovies-tickets/common";
import {URLParamRegexPatternSchema} from "@/shared/_feat/parse-query-string";

/** Zod schema for validating and parsing movie filter criteria from URL parameters. */
export const MovieQueryFiltersSchema = z.object({
    _id: ObjectIdSchema.optional(),
    title: URLParamRegexPatternSchema,
    releaseDate: DateOnlyInstanceSchema.optional(),
    genres: generateURLParamArraySchema(ObjectIdSchema),
    originalTitle: URLParamRegexPatternSchema,
    isReleased: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
    country: ISO3166Alpha2CountryCodeSchema.optional(),
    isAvailable: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
});

/** Type definition for movie query filters inferred from the schema. */
export type MovieQueryFilters = z.infer<typeof MovieQueryFiltersSchema>;
