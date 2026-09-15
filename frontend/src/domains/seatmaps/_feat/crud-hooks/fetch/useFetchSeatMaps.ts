/**
 * @fileoverview React Query hook for fetching and validating a list of seat maps.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/shared/_err/HttpResponseError.ts";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import {find} from "@/domains/seatmaps/_feat/crud/repository.ts";
import {ListQueryConfig} from "@/shared/_types";
import {SeatMapCRUDQueryKeys} from "@/domains/seatmaps/_feat/crud-hooks/keys/queryKey.ts";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";

/** Fetches a collection of seat maps based on provided query parameters and validation schema. */
export function useFetchSeatMaps<TData = unknown>(
    {queries, options, config, schema}: ListQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchData = buildQueryFn<TData>({
        action: () => find({queries, config}),
        schema
    });

    return useQuery({
        queryKey: SeatMapCRUDQueryKeys.list({...queries, ...config}),
        queryFn: fetchData,
        ...useQueryOptionsDefaults(options),
    });
}
