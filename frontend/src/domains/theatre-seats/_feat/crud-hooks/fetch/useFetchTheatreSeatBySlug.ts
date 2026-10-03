/**
 * @fileoverview Hook for fetching a single seat by its slug with schema validation and standardized query options.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {HttpResponseError} from "@noovies-tickets/common";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import {SlugQueryConfig} from "@/shared/_types";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";

import {findBySlug} from "@/domains/theatre-seats/_feat/crud";
import {TheatreSeatCRUDQueryKeys} from "@/domains/theatre-seats/_feat/crud-hooks/keys";

/**
 * Retrieves a single seat entity by its unique slug and validates the response against a Zod schema.
 */
export function useFetchTheatreSeatBySlug<TData = unknown>(
    {schema, slug, config, options}: SlugQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchSeat = buildQueryFn<TData>({
        action: () => findBySlug({slug, config}),
        schema,
    });

    return useQuery({
        queryKey: TheatreSeatCRUDQueryKeys.slug({slug, ...config}),
        queryFn: fetchSeat,
        ...useQueryOptionsDefaults(options),
    });
}
