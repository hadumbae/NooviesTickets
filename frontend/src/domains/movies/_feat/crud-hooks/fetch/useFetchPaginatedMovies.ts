/**
 * @fileoverview Hook for fetching and validating paginated movie data from the API.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";

import {HttpResponseError} from "@noovies-tickets/common";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import {MovieCRUDQueryKeys} from "@/domains/movies/_feat/crud-hooks/keys/queryKeys.ts";
import {paginated} from "@/domains/movies/_feat/crud";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {PaginatedQueryConfig} from "@/shared/_types";

/** Fetches a paginated list of movies and validates the response against a schema. */
export function useFetchPaginatedMovies<TData = unknown>(
    {schema, page, perPage, queries, config, options}: PaginatedQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchPaginatedMovies = buildQueryFn<TData>({
        action: () => paginated({pagination: {page, perPage}, queries, config}),
        schema,
    });

    return useQuery({
        queryKey: MovieCRUDQueryKeys.paginated({page, perPage, ...queries, ...config}),
        queryFn: fetchPaginatedMovies,
        ...useQueryOptionsDefaults(options),
    });
}
