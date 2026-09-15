/**
 * @fileoverview Hook for fetching paginated movie reviews and their aggregate details.
 */
import {ObjectIdString} from "@noovies-tickets/common";
import {PaginationOptions} from "@noovies-tickets/common";
import {RequestOptions} from "@/shared/_types/request/RequestOptions.ts";
import {FetchQueryOptions} from "@/shared/_types/fetch-queries/FetchQueryOptions.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/shared/_err/HttpResponseError.ts";
import {getFetchReviewDetailsByMovie} from "@/domains/movie-reviews/_feat/fetch-by-movie/repository/repository.ts";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import {FetchByMovieQueryKeys} from "@/domains/movie-reviews/_feat/fetch-by-movie/fetch/queryKeys.ts";
import {MovieReviewSummaryData, MovieReviewSummarySchema} from "@/domains/movie-reviews/_feat/fetch-by-movie/schemas/MovieReviewSummarySchema.ts";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data/buildQueryFn.ts";

/** Parameters for detailed movie review queries. */
type FetchParams = PaginationOptions & {
    movieID: ObjectIdString;
    config?: Omit<RequestOptions, "limit">;
    options?: FetchQueryOptions<MovieReviewSummaryData>;
};

/** Fetches paginated movie reviews with aggregate details. */
export function useFetchReviewDetailsByMovie(
    {movieID, page, perPage, config, options}: FetchParams
): UseQueryResult<MovieReviewSummaryData, HttpResponseError> {
    const fetchReviews = buildQueryFn<MovieReviewSummaryData>({
        action: () => getFetchReviewDetailsByMovie({movieID, page, perPage, config}),
        schema: MovieReviewSummarySchema,
    });

    return useQuery({
        queryKey: FetchByMovieQueryKeys.details({...config, page, perPage, movieID}),
        queryFn: fetchReviews,
        ...useQueryOptionsDefaults(options),
    });
}