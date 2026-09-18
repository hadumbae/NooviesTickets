/**
 * @file Query filter schema for movie review matching.
 * MovieReviewMatchFiltersSchema.ts
 */

import {z} from "zod";
import {MovieReviewRatingSchema} from "@/domains/movie-reviews/_schema/fields/MovieReviewRatingSchema.ts";
import {MovieReviewUniqueCodeSchema} from "@/domains/movie-reviews/_schema/fields/MovieReviewUniqueCodeSchema.ts";
import {
    BooleanValueSchema,
    IDStringSchema,
    preprocessOptionalField,
    preprocessToBoolean,
    preprocessToNumber, SlugStringSchema
} from "@noovies-tickets/common";

/**
 * Filter criteria for movie review queries.
 */
export const MovieReviewMatchQueryFiltersSchema = z.object({
    user: preprocessOptionalField(IDStringSchema),
    movie: preprocessOptionalField(IDStringSchema),
    isRecommended: preprocessToBoolean(BooleanValueSchema),
    rating: preprocessToNumber(MovieReviewRatingSchema.optional()).optional(),
    slug: preprocessOptionalField(SlugStringSchema),
    uniqueCode: preprocessOptionalField(MovieReviewUniqueCodeSchema),
});

/**
 * Inferred type for movie review query filters.
 */
export type MovieReviewMatchQueryFilters = z.infer<typeof MovieReviewMatchQueryFiltersSchema>;