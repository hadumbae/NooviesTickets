/**
 * @fileoverview Hook for fetching a single seat by ID with schema validation and standardized query options.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {HttpResponseError} from "@noovies-tickets/common";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import {IDQueryConfig} from "@/shared/_types";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";

import {findByID} from "@/domains/theatre-seats/_feat/crud";
import {TheatreSeatCRUDQueryKeys} from "@/domains/theatre-seats/_feat/crud-hooks/keys";

/**
 * Retrieves a single seat entity by its unique identifier and validates the response against a Zod schema.
 */
export function useFetchTheatreSeat<TData = unknown>(
    {schema, _id, config, options}: IDQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchSeat = buildQueryFn<TData>({
        action: () => findByID({_id, config}),
        schema,
    });

    return useQuery({
        queryKey: TheatreSeatCRUDQueryKeys._id({_id, ...config}),
        queryFn: fetchSeat,
        ...useQueryOptionsDefaults(options),
    });
}
