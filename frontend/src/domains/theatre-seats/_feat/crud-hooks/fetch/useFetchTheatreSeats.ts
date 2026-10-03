/**
 * @fileoverview Hook for fetching seat collections based on filters with schema validation and standardized query options.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {HttpResponseError} from "@noovies-tickets/common";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import {ListQueryConfig} from "@/shared/_types";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";

import {query} from "@/domains/theatre-seats/_feat/crud";
import {TheatreSeatQueryOptions} from "@/domains/theatre-seats/_feat/handle-query-options";
import {TheatreSeatCRUDQueryKeys} from "@/domains/theatre-seats/_feat/crud-hooks/keys";

/**
 * Retrieves a list of seat entities matching the provided query filters and validates the response.
 */
export function useFetchTheatreSeats<TData = unknown>(
    {schema, queries, config, options}: ListQueryConfig<TData, TheatreSeatQueryOptions>
): UseQueryResult<TData, HttpResponseError> {
    const fetchSeats = buildQueryFn<TData>({
        action: () => query({queries, config}),
        schema,
    });

    return useQuery({
        queryKey: TheatreSeatCRUDQueryKeys.query({...queries, ...config}),
        queryFn: fetchSeats,
        ...useQueryOptionsDefaults(options),
    });
}
