/**
 * @fileoverview React Query hook for fetching and validating a single movie by its ID.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/shared/_err/HttpResponseError.ts";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import {IDQueryConfig} from "@/shared/_types";
import {findByID} from "@/domains/movies/_feat/crud";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {MovieCRUDQueryKeys} from "@/domains/movies/_feat/crud-hooks/keys";

/** Fetches a movie document and validates it against the provided schema. */
export function useFetchMovie<TData = unknown>(
    {_id, config, options, schema}: IDQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchMovie = buildQueryFn<TData>({
        action: () => findByID({_id, config}),
        schema,
    });

    return useQuery({
        queryKey: MovieCRUDQueryKeys._id({_id, ...config}),
        queryFn: fetchMovie,
        ...useQueryOptionsDefaults(options),
    });
}
