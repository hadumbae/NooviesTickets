/**
 * @fileoverview Zod validation schemas and inferred types for movie review form submissions.
 */

import {z} from "zod";
import {AnyValues} from "@/shared/_types";
import {MovieReviewRatingSchema} from "@/domains/movie-reviews/_schema/fields/MovieReviewRatingSchema.ts";
import {BooleanValueSchema, IDStringSchema, preprocessOptionalField, preprocessToNumber, preprocessToUndefined} from "@noovies-tickets/common";
import {NonEmptyStringSchema, StringValueSchema} from "@noovies-tickets/common";

/** Validation schema for movie review form submission. */
export const MovieReviewFormSchema = z.object({
    _id: IDStringSchema.optional().nullable(),
    movie: preprocessToUndefined(IDStringSchema),
    rating: preprocessToNumber(MovieReviewRatingSchema),
    isRecommended: BooleanValueSchema.optional(),
    displayName: preprocessToUndefined(NonEmptyStringSchema.max(100, "Must be 500 characters or less.")),
    summary: preprocessToUndefined(NonEmptyStringSchema.max(500, "Must be 500 characters or less.")),
    reviewText: preprocessOptionalField(StringValueSchema.max(2000, "Must be 2000 characters or less."))
});

/** Inferred type for movie review form input. */
export type MovieReviewForm = z.infer<typeof MovieReviewFormSchema>;

/** Inferred type for processed movie review form values. */
export type MovieReviewFormValues = AnyValues<MovieReviewForm>;