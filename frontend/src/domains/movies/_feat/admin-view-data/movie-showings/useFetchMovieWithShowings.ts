/**
 * @fileoverview Custom React Query hook for fetching and validating movie showings view data.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {
    MovieShowingsViewData,
    MovieShowingsViewDataSchema
} from "@/domains/movies/_feat/admin-view-data/movie-showings/MovieShowingsViewDataSchema.ts";
import {HttpResponseError, SlugString} from "@noovies-tickets/common";
import {FetchQueryOptions} from "@/shared/_types";
import {buildQueryFn, useQueryOptionsDefaults} from "@/shared/_feat";
import {
    getFetchMovieWithShowings
} from "@/domains/movies/_feat/admin-view-data/movie-showings/getFetchMovieWithShowings.ts";
import {MovieAdminViewDataQueryKeys} from "@/domains/movies/_feat/admin-view-data/queryKeys.ts";

/** Props for the useFetchMovieWithShowings hook. */
type FetchConfig = {
    slug: SlugString;
    page?: number;
    perPage?: number;
    options?: FetchQueryOptions<MovieShowingsViewData>;
}

/** Fetches and validates movie showings view data for the admin interface. */
export function useFetchMovieWithShowings(
    {slug, page, perPage, options}: FetchConfig
): UseQueryResult<MovieShowingsViewData, HttpResponseError> {
    const fetchData = buildQueryFn({
        action: () => getFetchMovieWithShowings({slug: slug, page, perPage}),
        schema: MovieShowingsViewDataSchema,
    });

    return useQuery({
        queryKey: MovieAdminViewDataQueryKeys.showings({_id: slug, page, perPage}),
        queryFn: fetchData,
        ...useQueryOptionsDefaults(options),
    });
}