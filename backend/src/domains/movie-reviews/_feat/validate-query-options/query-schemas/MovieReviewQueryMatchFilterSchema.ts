/**
 * @fileoverview Defines the schema and types for filtering movie review queries.
 */

import {z} from "zod";
import {ObjectIdSchema} from "@/shared/schema/mongoose/ObjectIdSchema";
import {
    BooleanValueSchema,
    PositiveNumberSchema,
    preprocessToBoolean,
    preprocessToNumber,
    SlugStringSchema
} from "@noovies-tickets/common";
import {MovieReviewUniqueCodeSchema} from "@/domains/movie-reviews/_validation/review-code/MovieReviewUniqueCodeSchema";

/** Zod schema for validating movie review match query filters from URL parameters. */
export const MovieReviewQueryMatchFilterSchema = z.object({
    user: ObjectIdSchema.optional(),
    movie: ObjectIdSchema.optional(),
    rating: preprocessToNumber(PositiveNumberSchema.optional()).optional(),
    isRecommended: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
    slug: SlugStringSchema.optional(),
    uniqueCode: MovieReviewUniqueCodeSchema.optional(),
});

/** Type definition inferred from MovieReviewMatchQueryFilterSchema. */
export type MovieReviewQueryMatchFilters = z.infer<typeof MovieReviewQueryMatchFilterSchema>;
