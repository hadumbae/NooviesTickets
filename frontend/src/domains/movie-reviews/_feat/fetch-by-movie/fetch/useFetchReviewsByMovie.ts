/**
 * @fileoverview React Query hook for fetching paginated reviews by movie ID.
 */

import {ObjectIdString} from "@noovies-tickets/common";
import {PaginationOptions} from "@noovies-tickets/common";
import {RequestOptions} from "@/shared/_types/request/RequestOptions.ts";
import {FetchQueryOptions} from "@/shared/_types/fetch-queries/FetchQueryOptions.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/shared/_err/HttpResponseError.ts";
import {getFetchReviewsByMovie} from "@/domains/movie-reviews/_feat/fetch-by-movie/repository/repository.ts";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import {FetchByMovieQueryKeys} from "@/domains/movie-reviews/_feat/fetch-by-movie/fetch/queryKeys.ts";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data/buildQueryFn.ts";
import {generatePaginationSchema} from "@noovies-tickets/common";
import {PopulatedMovieReview, PopulatedMovieReviewSchema} from "@/domains/movie-reviews/_schema/model/PopulatedMovieReviewSchema.ts";
import {PaginatedItems} from "@/shared/_types";

/** Parameters required to fetch paginated reviews for a specific movie. */
type FetchParams = PaginationOptions & {
    movieID: ObjectIdString;
    config?: Omit<RequestOptions, "limit">;
    options?: FetchQueryOptions<PaginatedItems<PopulatedMovieReview>>;
};

/** Fetches paginated reviews for a given movie. */
export function useFetchReviewsByMovie(
    {movieID, page, perPage, config, options}: FetchParams
): UseQueryResult<PaginatedItems<PopulatedMovieReview>, HttpResponseError> {
    const fetchReviews = buildQueryFn<PaginatedItems<PopulatedMovieReview>>({
        action: () => getFetchReviewsByMovie({movieID, page, perPage, config}),
        schema: generatePaginationSchema(PopulatedMovieReviewSchema),
    });

    return useQuery({
        queryKey: FetchByMovieQueryKeys.movie({...config, movieID}),
        queryFn: fetchReviews,
        ...useQueryOptionsDefaults(options),
    });
}