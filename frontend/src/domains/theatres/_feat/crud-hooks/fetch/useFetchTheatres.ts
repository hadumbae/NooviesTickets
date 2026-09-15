/**
 * @file useFetchTheatres.ts
 *
 * React Query hook for fetching theatres by query.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/shared/_err/HttpResponseError.ts";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {ListQueryConfig} from "@/shared/_types";

import {query} from "@/domains/theatres/_feat/crud";
import {TheatreCRUDQueryKeys} from "@/domains/theatres/_feat/crud-hooks/keys";

/**
 * Fetch theatres using query filters.
 */
export function useFetchTheatres<TData = unknown>(
    {schema, queries, config, options}: ListQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {

    const fetchTheatres = buildQueryFn<TData>({
        action: () => query({queries, config}),
        schema,
    });

    return useQuery({
        queryKey: TheatreCRUDQueryKeys.query({...queries, ...config}),
        queryFn: fetchTheatres,
        ...useQueryOptionsDefaults(options),
    });
}
