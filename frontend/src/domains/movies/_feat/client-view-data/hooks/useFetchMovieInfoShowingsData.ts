/**
 * @fileoverview React Query hook for retrieving movie showings view data.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {HttpResponseError, SlugString} from "@noovies-tickets/common";
import {FetchQueryOptions} from "@/shared/_types/fetch-queries/FetchQueryOptions.ts";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import {MovieClientViewDataQueryKeys} from "@/domains/movies/_feat/client-view-data/hooks/queryKeys.ts";
import {MovieInfoShowingViewData, MovieInfoShowingViewSchema} from "@/domains/movies/_feat/client-view-data/schemas";
import {
    getShowingsForMovieInfoView,
    GetShowingsForMovieViewQueryStrings
} from "@/domains/movies/_feat/client-view-data/repository";

/** Parameters for the movie showings data fetch hook. */
type FetchParams = {
    slug: SlugString;
    queries: GetShowingsForMovieViewQueryStrings;
    options?: FetchQueryOptions<MovieInfoShowingViewData>;
};

/** Fetches and validates movie showing data for the client view. */
export function useFetchMovieInfoShowingsData(
    {slug, queries, options}: FetchParams
): UseQueryResult<MovieInfoShowingViewData, HttpResponseError> {
    const fetchData = buildQueryFn<MovieInfoShowingViewData>({
        action: () => getShowingsForMovieInfoView({slug, queries}),
        schema: MovieInfoShowingViewSchema,
    });

    return useQuery({
        queryKey: MovieClientViewDataQueryKeys.infoShowings({slug, ...queries}),
        queryFn: fetchData,
        ...useQueryOptionsDefaults(options),
    });
}