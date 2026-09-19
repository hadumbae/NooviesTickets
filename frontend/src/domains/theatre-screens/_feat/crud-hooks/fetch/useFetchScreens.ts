/**
 * @fileoverview React Query hook for fetching theatre screens based on query filters.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {HttpResponseError} from "@noovies-tickets/common";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";

import {find} from "@/domains/theatre-screens/_feat/crud";
import {TheatreScreenQueryOptions} from "@/domains/theatre-screens/_schema";
import {TheatreScreenCRUDQueryKeys} from "@/domains/theatre-screens/_feat/crud-hooks/keys";
import {ListQueryConfig} from "@/shared/_types";

/**
 * Fetches and validates a list of theatre screens using standardized query filtering.
 */
export function useFetchScreens<TData = unknown>(
    {schema, queries, config, options}: ListQueryConfig<TData, TheatreScreenQueryOptions>
): UseQueryResult<TData, HttpResponseError> {
    const fetchScreens = buildQueryFn<TData>({
        action: () => find({queries, config}),
        schema
    });

    return useQuery({
        queryKey: TheatreScreenCRUDQueryKeys.find({...queries, ...config}),
        queryFn: fetchScreens,
        ...useQueryOptionsDefaults(options),
    });
}