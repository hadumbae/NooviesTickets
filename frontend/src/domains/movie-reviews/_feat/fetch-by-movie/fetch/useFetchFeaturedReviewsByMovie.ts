/**
 * @fileoverview React Query hook for fetching featured movie reviews.
 */
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {HttpResponseError, ObjectIdString} from "@noovies-tickets/common";
import {FetchQueryOptions} from "@/shared/_types/fetch-queries/FetchQueryOptions.ts";
import {RequestOptions} from "@/shared/_types/request/RequestOptions.ts";
import {getFetchFeaturedReviewsByMovie} from "@/domains/movie-reviews/_feat/fetch-by-movie/repository/repository.ts";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import {
    FeaturedReviewsByMovie,
    FeaturedReviewsByMovieSchema,
} from "@/domains/movie-reviews/_feat/fetch-by-movie/schemas/FeaturedReviewsByMovieSchema.ts";
import {FetchByMovieQueryKeys} from "@/domains/movie-reviews/_feat/fetch-by-movie/fetch/queryKeys.ts";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data/buildQueryFn.ts";

/** Parameters for fetching featured movie reviews. */
export type FetchParams = {
    movieID: ObjectIdString;
    config?: Pick<RequestOptions, "limit">;
    options?: FetchQueryOptions<FeaturedReviewsByMovie>;
};

/**
 * Hook that fetches featured reviews for a specific movie.
 */
export function useFetchFeaturedReviewsByMovie(
    {movieID, options, config}: FetchParams
): UseQueryResult<FeaturedReviewsByMovie, HttpResponseError> {
    const fetchReviews = buildQueryFn<FeaturedReviewsByMovie>({
        action: () => getFetchFeaturedReviewsByMovie({movieID, config: {populate: true, virtuals: true, ...config}}),
        schema: FeaturedReviewsByMovieSchema,
    });

    return useQuery({
        queryKey: FetchByMovieQueryKeys.featured({...config, movieID}),
        queryFn: fetchReviews,
        ...useQueryOptionsDefaults(options),
    });
}