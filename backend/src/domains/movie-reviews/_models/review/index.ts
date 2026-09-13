import {MovieReviewSchema} from "@/domains/movie-reviews/_models/review/MovieReview.schema";
import {MovieReviewModel} from "@/domains/movie-reviews/_models/review/MovieReview.model";
import type {
    CustomerMovieReviewSummary,
    MovieReviewSchemaFields,
    MyMovieReviewSchemaFields
} from "@/domains/movie-reviews/_models/review/MovieReview.types";

export {
    MovieReviewSchema,
    MovieReviewModel,
}

export type {
    MovieReviewSchemaFields,
    MyMovieReviewSchemaFields,
    CustomerMovieReviewSummary,
}

