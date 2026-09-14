/**
 * @fileoverview Hook for fetching and validating a single movie by its slug.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/shared/_err/HttpResponseError.ts";
import {useQueryOptionDefaults} from "@/shared/_feat/handle-query/useQueryOptionDefaults.ts";
import {SlugQueryConfig} from "@/shared/_types";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {MovieCRUDQueryKeys} from "@/domains/movies/_feat/crud-hooks/keys/queryKeys.ts";
import {findBySlug} from "@/domains/movies/_feat/crud";

/** Fetches a movie by slug and validates the response against a schema. */
export function useFetchMovieBySlug<TData = unknown>(
    {schema, slug, config, options}: SlugQueryConfig<TData>,
): UseQueryResult<TData, HttpResponseError> {
    const fetchMovie = buildQueryFn<TData>({
        action: () => findBySlug({slug, config}),
        schema,
    });

    return useQuery({
        queryKey: MovieCRUDQueryKeys.slug({slug, ...config}),
        queryFn: fetchMovie,
        ...useQueryOptionDefaults(options),
    });
}
