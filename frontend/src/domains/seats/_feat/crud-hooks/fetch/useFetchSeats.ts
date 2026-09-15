/**
 * @fileoverview Hook for fetching seat collections based on filters with schema validation and standardized query options.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/shared/_err/HttpResponseError.ts";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import {ListQueryConfig} from "@/shared/_types";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";

import {query} from "@/domains/seats/_feat/crud";
import {SeatQueryOptions} from "@/domains/seats/_feat/handle-query-options";
import {SeatCRUDQueryKeys} from "@/domains/seats/_feat/crud-hooks/keys";

/**
 * Retrieves a list of seat entities matching the provided query filters and validates the response.
 */
export function useFetchSeats<TData = unknown>(
    {schema, queries, config, options}: ListQueryConfig<TData, SeatQueryOptions>
): UseQueryResult<TData, HttpResponseError> {
    const fetchSeats = buildQueryFn<TData>({
        action: () => query({queries, config}),
        schema,
    });

    return useQuery({
        queryKey: SeatCRUDQueryKeys.query({...queries, ...config}),
        queryFn: fetchSeats,
        ...useQueryOptionsDefaults(options),
    });
}