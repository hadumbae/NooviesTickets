/**
 * @fileoverview Hook for fetching paginated seat map data with validation.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import {PaginatedQueryConfig} from "@/shared/_types";
import {paginated} from "@/domains/seatmaps/_feat/crud/repository.ts";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {SeatMapCRUDQueryKeys} from "@/domains/seatmaps/_feat/crud-hooks/keys/queryKey.ts";
import HttpResponseError from "@/shared/_err/HttpResponseError.ts";

/** Fetches a paginated list of seat maps and validates the response against a schema. */
export function useFetchPaginatedSeatMaps<TData = unknown>(
    {page, perPage, queries, config, options, schema}: PaginatedQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchSeatMap = buildQueryFn<TData>({
        action: () => paginated({queries, config, pagination: {page, perPage}}),
        schema,
    });

    return useQuery({
        queryKey: SeatMapCRUDQueryKeys.paginated({page, perPage, ...config, ...queries}),
        queryFn: fetchSeatMap,
        ...useQueryOptionsDefaults(options),
    });
}
