/**
 * @fileoverview Defines the schema and types for filtering movie review queries.
 */

import {z} from "zod";
import {ObjectIdSchema} from "@/shared/_schema/mongoose/ObjectIdSchema";
import {MovieReviewUniqueCodeSchema} from "@/domains/movie-reviews/_validation/review-code/MovieReviewUniqueCodeSchema";
import {
    BooleanValueSchema,
    PositiveNumberSchema,
    preprocessOptionalField,
    preprocessToBoolean,
    preprocessToNumber,
    SlugStringSchema
} from "@noovies-tickets/common";

/** Zod schema for validating movie review match query filters from URL parameters. */
export const MovieReviewQueryMatchFilterSchema = z.object({
    user: preprocessOptionalField(ObjectIdSchema),
    movie: preprocessOptionalField(ObjectIdSchema),
    isRecommended: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
    rating: preprocessToNumber(PositiveNumberSchema.optional()).optional(),
    slug: preprocessOptionalField(SlugStringSchema),
    uniqueCode: preprocessOptionalField(MovieReviewUniqueCodeSchema),
});

/** Type definition inferred from MovieReviewMatchQueryFilterSchema. */
export type MovieReviewQueryMatchFilters = z.infer<typeof MovieReviewQueryMatchFilterSchema>;
