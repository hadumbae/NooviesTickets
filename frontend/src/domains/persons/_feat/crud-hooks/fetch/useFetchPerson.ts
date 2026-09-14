/**
 * @fileoverview React Query hook for fetching a single Person record by ID.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {useQueryOptionDefaults} from "@/shared/_feat/handle-query/useQueryOptionDefaults.ts";
import HttpResponseError from "@/shared/_err/HttpResponseError.ts";
import {IDQueryConfig} from "@/shared/_types";
import {findByID} from "@/domains/persons/_feat/crud";
import {PersonCRUDQueryKeys} from "@/domains/persons/_feat/crud-hooks/keys";

/** Hook to retrieve and validate a specific Person entity by its ID. */
export function useFetchPerson<TData = unknown>(
    {_id, schema, config, options}: IDQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchPerson = buildQueryFn<TData>({
        action: () => findByID({_id, config}),
        schema,
    });

    return useQuery({
        queryKey: PersonCRUDQueryKeys._id({_id, ...config}),
        queryFn: fetchPerson,
        ...useQueryOptionDefaults(options),
    });
}