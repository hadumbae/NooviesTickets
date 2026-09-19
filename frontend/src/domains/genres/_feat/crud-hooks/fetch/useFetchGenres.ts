/**
 * @fileoverview React Query hook for fetching Genre collections using aggregation.
 *
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {RequestOptions} from "@/shared/_types/request/RequestOptions.ts";
import {FetchQueryOptions} from "@/shared/_types/fetch-queries/FetchQueryOptions.ts";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import {GenreCRUDQueryKeys} from "@/domains/genres/_feat/crud-hooks/keys/GenreCRUDQueryKeys.ts";
import {ZodType, ZodTypeDef} from "zod";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {query} from "@/domains/genres/_feat/crud";
import {GenreQueryOptions, HttpResponseError} from "@noovies-tickets/common";
import {RequestPaginationOptions} from "@/shared/_types/request/RequestPaginationOptions";

/** Parameters for the useFetchGenres hook. */
type FetchQueries<TData = unknown> = {
    schema: ZodType<TData, ZodTypeDef, unknown>;
    queries?: GenreQueryOptions & RequestPaginationOptions;
    config?: RequestOptions;
    options?: FetchQueryOptions<TData>;
};

/** Hook for fetching and validating a list of genres. */
export function useFetchGenres<TData = unknown>(
    {schema, queries, config, options}: FetchQueries<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchGenres = buildQueryFn<TData>({
        action: () => query({queries, config}),
        schema,
    });

    return useQuery({
        queryKey: GenreCRUDQueryKeys.query({...queries, ...config}),
        queryFn: fetchGenres,
        ...useQueryOptionsDefaults(options),
    });
}