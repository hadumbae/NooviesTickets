/**
 * @fileoverview Defines the schema and type for movie review documents.
 *
 */

import {z} from "zod";
import {BooleanValueSchema, IDStringSchema, MongooseTimestampsSchema, SlugStringSchema, PositiveNumberSchema} from "@noovies-tickets/common";
import {NonEmptyStringSchema} from "@noovies-tickets/common";
import {MovieReviewUniqueCodeSchema} from "@/domains/movie-reviews/_schema/fields";

/** Zod validation schema for a movie review document. */
export const MovieReviewSchema = MongooseTimestampsSchema.extend({
    _id: IDStringSchema,
    user: IDStringSchema,
    movie: IDStringSchema,
    displayName: NonEmptyStringSchema.max(100, "Must be 100 characters or less."),
    reviewText: NonEmptyStringSchema.max(2000, "Must be 2000 characters or less.").optional(),
    summary: NonEmptyStringSchema.max(500, "Must be 500 characters or less."),
    rating: PositiveNumberSchema.max(5, "Must be 1-5."),
    isRecommended: BooleanValueSchema.optional(),
    isPublic: BooleanValueSchema,
    slug: SlugStringSchema,
    uniqueCode: MovieReviewUniqueCodeSchema,
});

/** Type definition for a movie review inferred from the schema. */
export type MovieReview = z.infer<typeof MovieReviewSchema>;