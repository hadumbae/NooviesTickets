/**
 * @fileoverview Hook for fetching and validating paginated movie review data for the client view.
 */

import {HttpResponseError, SlugString} from "@noovies-tickets/common";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {getReviewsForMovieInfoView} from "@/domains/movies/_feat/client-view-data/repository/repository.ts";
import {MovieClientViewDataQueryKeys} from "@/domains/movies/_feat/client-view-data/hooks/queryKeys.ts";
import {
    MovieInfoReviewsViewData,
    MovieInfoReviewsViewSchema
} from "@/domains/movies/_feat/client-view-data/schemas/MovieInfoReviewsViewSchema.ts";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {FetchQueryOptions} from "@/shared/_types/fetch-queries/FetchQueryOptions.ts";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";

/** Configuration for the movie reviews fetch hook. */
type FetchConfig = {
    slug: SlugString;
    queries?: {
        reviewPage?: number;
        reviewPerPage?: number;
    };
    options?: FetchQueryOptions<MovieInfoReviewsViewData>;
}

/** Fetches and validates paginated review data for a specific movie. */
export function useFetchMovieInfoReviewsData(
    {slug, queries, options}: FetchConfig
): UseQueryResult<MovieInfoReviewsViewData, HttpResponseError> {
    const fetchReviewData = buildQueryFn<MovieInfoReviewsViewData>({
        action: () => getReviewsForMovieInfoView({slug, queries}),
        schema: MovieInfoReviewsViewSchema,
    });

    return useQuery({
        queryKey: MovieClientViewDataQueryKeys.infoReviews({slug, ...queries}),
        queryFn: fetchReviewData,
        ...useQueryOptionsDefaults(options),
    });
}