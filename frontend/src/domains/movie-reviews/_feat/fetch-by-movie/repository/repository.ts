/**
 * @file Movie review browse request builders.
 * ReviewsByMovieRepository.ts
 */

import {
    FetchPaginatedReviewsByMovieConfig,
    FetchReviewsByMovieConfig
} from "@/domains/movie-reviews/_feat/fetch-by-movie/repository/repository.types.ts";
import {handleFetchOperation} from "@/shared/_feat/use-fetch-api/handleFetchOperation.ts";
import {FetchRequestReturns} from "@/shared/_types/request/FetchRequestReturns.ts";
import {buildURL} from "@/shared/_feat/fetch-api";
import {ReviewsByMovieBaseURL} from "@/domains/movie-reviews/_feat/fetch-by-movie/repository/baseURL.ts";
import {PaginatedItems} from "@/shared/_types";
import {FeaturedReviewsByMovie} from "@/domains/movie-reviews/_feat/fetch-by-movie/schemas/FeaturedReviewsByMovieSchema.ts";
import {MovieReviewSummaryData} from "@/domains/movie-reviews/_feat/fetch-by-movie/schemas/MovieReviewSummarySchema.ts";
import {PopulatedMovieReview} from "@/domains/movie-reviews/_schema/model/PopulatedMovieReviewSchema.ts";

/**
 * Requests paginated reviews for a movie.
 */
export const getFetchReviewsByMovie = (
    {movieID, page, perPage, config}: FetchPaginatedReviewsByMovieConfig
): Promise<FetchRequestReturns<PaginatedItems<PopulatedMovieReview>>> => {
    const url = buildURL({
        baseURL: ReviewsByMovieBaseURL,
        path: `/item/${movieID}/reviews`,
        queries: {page, perPage, ...config},
    });

    return handleFetchOperation({url, method: "GET"});
};

/**
 * Requests paginated reviews with aggregate details for a movie.
 */
export const getFetchReviewDetailsByMovie = (
    {movieID, page, perPage, config}: FetchPaginatedReviewsByMovieConfig
): Promise<FetchRequestReturns<MovieReviewSummaryData>> => {
    const url = buildURL({
        baseURL: ReviewsByMovieBaseURL,
        path: `/item/${movieID}/reviews/details`,
        queries: {page, perPage, ...config},
    });

    return handleFetchOperation({url, method: "GET"});
};

/**
 * Fetches featured reviews for a movie.
 */
export const getFetchFeaturedReviewsByMovie = (
    {movieID, config}: FetchReviewsByMovieConfig
): Promise<FetchRequestReturns<FeaturedReviewsByMovie>> => {
    const url = buildURL({
        baseURL: ReviewsByMovieBaseURL,
        path: `/item/${movieID}/reviews/featured`,
        queries: config,
    });

    return handleFetchOperation({url, method: "GET"});
};