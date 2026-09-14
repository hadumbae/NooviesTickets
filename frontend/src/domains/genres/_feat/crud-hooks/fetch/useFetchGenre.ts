/**
 * @fileoverview Custom hook for fetching a single genre by its ID.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/shared/_err/HttpResponseError.ts";
import {ObjectIdString} from "@noovies-tickets/common";
import {RequestOptions} from "@/shared/_types/request/RequestOptions.ts";
import {FetchQueryOptions} from "@/shared/_types/fetch-queries/FetchQueryOptions.ts";
import {useQueryOptionDefaults} from "@/shared/_feat/handle-query/useQueryOptionDefaults.ts";
import {GenreCRUDQueryKeys} from "@/domains/genres/_feat/crud-hooks/keys/GenreCRUDQueryKeys.ts";
import {ZodType, ZodTypeDef} from "zod";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {findByID} from "@/domains/genres/_feat/crud";

/**
 * Parameters for the useFetchGenre hook.
 */
type FetchParams<TData = unknown> = {
    _id: ObjectIdString;
    schema: ZodType<TData, ZodTypeDef, unknown>;
    config?: Omit<RequestOptions, "limit">;
    options?: FetchQueryOptions<TData>;
};

/**
 * Custom hook for retrieving a single genre via the Genre repository.
 */
export function useFetchGenre<TData = unknown>(
    {_id, schema, config, options}: FetchParams<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchGenre = buildQueryFn<TData>({
        action: () => findByID({_id, config}),
        schema,
    });

    return useQuery({
        queryKey: GenreCRUDQueryKeys._id({_id, ...config}),
        queryFn: fetchGenre,
        ...useQueryOptionDefaults(options),
    });
}