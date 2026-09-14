/**
 * @fileoverview Hook for fetching and validating movie overview view data.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {SlugString} from "@noovies-tickets/common";
import {FetchQueryOptions} from "@/shared/_types/fetch-queries/FetchQueryOptions.ts";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {useQueryOptionDefaults} from "@/shared/_feat/handle-query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/shared/_err/HttpResponseError.ts";
import {getOverviewDataForMovieInfoView} from "@/domains/movies/_feat/client-view-data/repository";
import {MovieClientViewDataQueryKeys} from "@/domains/movies/_feat/client-view-data/hooks/queryKeys.ts";
import {MovieInfoOverviewViewData, MovieInfoOverviewViewSchema} from "@/domains/movies/_feat/client-view-data/schemas";

/** Configuration for fetching movie info overview data. */
type FetchConfig = {
    slug: SlugString;
    options?: FetchQueryOptions<MovieInfoOverviewViewData>;
    queries?: {
        reviewPage: number;
        reviewPerPage: number;
    };
}

/** Fetches and validates the composite data for the movie information overview view. */
export function useFetchMovieInfoOverviewViewData(
    {slug, options, queries = {reviewPage: 1, reviewPerPage: 3}}: FetchConfig
): UseQueryResult<MovieInfoOverviewViewData, HttpResponseError> {
    const fetchViewData = buildQueryFn({
        action: () => getOverviewDataForMovieInfoView({slug, queries}),
        schema: MovieInfoOverviewViewSchema,
    });

    return useQuery({
        queryKey: MovieClientViewDataQueryKeys.infoOverview({slug, ...queries}),
        queryFn: fetchViewData,
        ...useQueryOptionDefaults(options),
    });
}