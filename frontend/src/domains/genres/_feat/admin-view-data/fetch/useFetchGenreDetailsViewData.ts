/**
 * @fileoverview Custom React Query hook for fetching administrative Genre view data.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {FetchQueryOptions} from "@/shared/_types/fetch-queries/FetchQueryOptions.ts";
import {PaginationOptions} from "@noovies-tickets/common";
import {SlugString} from "@noovies-tickets/common";
import {getFetchGenreDetails} from "@/domains/genres/_feat/admin-view-data/repository";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import HttpResponseError from "@/shared/_err/HttpResponseError.ts";
import {GenreAdminViewDataQueryKeys} from "@/domains/genres/_feat/admin-view-data/fetch/GenreAdminViewDataQueryKeys.ts";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {GenreDetailsViewData, GenreDetailsViewDataSchema} from "@/domains/genres/_feat/admin-view-data/schema";

/** Parameters for the useFetchGenreDetailsViewData hook. */
type FetchParams = {
    slug: SlugString;
    queries: PaginationOptions;
    options?: FetchQueryOptions<unknown>;
};

/**
 * Fetches and validates the administrative view data for a specific genre.
 */
export function useFetchGenreDetailsViewData(
    {slug, queries, options}: FetchParams
): UseQueryResult<GenreDetailsViewData, HttpResponseError> {
    const {page, perPage} = queries;

    const fetchGenreData = buildQueryFn({
        schema: GenreDetailsViewDataSchema,
        action: () => getFetchGenreDetails({slug, queries}),
    });

    return useQuery({
        queryKey: GenreAdminViewDataQueryKeys.itemDetails({slug, page, perPage}),
        queryFn: fetchGenreData,
        ...useQueryOptionsDefaults(options),
    });
}