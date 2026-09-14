/**
 * @fileoverview Maps MongoDB duplicate index errors to ZodDuplicateIndexError for the MovieReview model.
 */

import {ZodDuplicateIndexError} from "@/shared/_errors/zod/ZodDuplicateIndexError.js";
import {MovieReviewModel} from "@/domains/movie-reviews/_models/review/MovieReview.model";

/** Translates a MongoDB duplicate index string into a typed ZodDuplicateIndexError. */
export function handleMovieReviewDuplicateIndex(indexString: string): never {
    if (indexString === "user_1_movie_1") {
        throw new ZodDuplicateIndexError({
            index: indexString,
            model: MovieReviewModel.modelName,
            message: "Duplicate movie review detected. Reviews must not have the same user and movie.",
            errors: [
                {
                    path: ["user"],
                    code: "custom",
                    message: "A movie review by user already exists for this movie."
                },
                {
                    path: ["movie"],
                    code: "custom",
                    message: "A movie review for this movie already exists by the user."
                }
            ],
        });
    }

    throw new ZodDuplicateIndexError({
        index: indexString,
        model: MovieReviewModel.modelName,
        errors: [],
        message: "Movie review with duplicate indexes detected."
    });
}