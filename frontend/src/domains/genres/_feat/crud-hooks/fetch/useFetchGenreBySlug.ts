/**
 * @fileoverview React Query hook for fetching a single Genre by its slug.
 */

import {ZodType, ZodTypeDef} from "zod";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import HttpResponseError from "@/shared/_err/HttpResponseError.ts";
import {RequestOptions} from "@/shared/_types/request/RequestOptions.ts";
import {FetchQueryOptions} from "@/shared/_types/fetch-queries/FetchQueryOptions.ts";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {findBySlug} from "@/domains/genres/_feat/crud";
import {GenreCRUDQueryKeys} from "@/domains/genres/_feat/crud-hooks/keys";

/** Parameters for the useFetchGenreBySlug hook. */
type FetchParams<TData = unknown> = {
    slug: string;
    schema: ZodType<TData, ZodTypeDef, unknown>;
    config?: Omit<RequestOptions, "limit">;
    options?: FetchQueryOptions<TData>;
};

/**
 * Fetches and validates a single genre based on its unique slug.
 */
export function useFetchGenreBySlug<TData = unknown>(
    {slug, schema, config, options}: FetchParams<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchGenre = buildQueryFn<TData>({
        schema,
        action: () => findBySlug({slug, config}),
    });

    return useQuery({
        queryKey: GenreCRUDQueryKeys.slug({slug, ...config}),
        queryFn: fetchGenre,
        ...useQueryOptionsDefaults<TData>(options),
    });
}