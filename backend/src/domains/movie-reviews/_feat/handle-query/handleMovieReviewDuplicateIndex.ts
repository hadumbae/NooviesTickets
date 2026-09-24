/**
 * @fileoverview Maps MongoDB duplicate index errors to ValidationError for the MovieReview model.
 */

import {ValidationError} from "@noovies-tickets/common";

/** Translates a MongoDB duplicate index string into a typed ValidationError. */
export function handleMovieReviewDuplicateIndex(indexString: string): never {
    if (indexString === "user_1_movie_1") {
        throw new ValidationError({
            errorCode: "ERR_DUPLICATE_INDEX",
            statusCode: 422,
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

    throw new ValidationError({
        errorCode: "ERR_DUPLICATE_INDEX",
        statusCode: 422,
        errors: [],
        message: "Movie review with duplicate indexes detected."
    });
}