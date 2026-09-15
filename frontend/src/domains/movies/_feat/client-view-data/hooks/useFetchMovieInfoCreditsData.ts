/**
 * @fileoverview Hook for fetching and validating movie credit information for the client view.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/shared/_err/HttpResponseError.ts";
import {FetchQueryOptions} from "@/shared/_types/fetch-queries/FetchQueryOptions.ts";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import {SlugString} from "@noovies-tickets/common";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {getCreditForMovieInfoView} from "@/domains/movies/_feat/client-view-data/repository";
import {MovieClientViewDataQueryKeys} from "@/domains/movies/_feat/client-view-data/hooks/queryKeys.ts";
import {MovieInfoCreditViewData, MovieInfoCreditViewSchema} from "@/domains/movies/_feat/client-view-data/schemas";

/** Parameters for fetching movie info credits data. */
export type FetchParams = {
    slug: SlugString;
    options?: FetchQueryOptions<MovieInfoCreditViewData>;
}

/** Fetches and validates movie credit data using a slug identifier. */
export function useFetchMovieInfoCreditsData(
    {slug, options}: FetchParams,
): UseQueryResult<MovieInfoCreditViewData, HttpResponseError> {
    const fetchData = buildQueryFn<MovieInfoCreditViewData>({
        action: () => getCreditForMovieInfoView({slug: slug}),
        schema: MovieInfoCreditViewSchema,
    });

    return useQuery({
        queryKey: MovieClientViewDataQueryKeys.infoCredits({slug}),
        queryFn: fetchData,
        ...useQueryOptionsDefaults(options),
    });
}