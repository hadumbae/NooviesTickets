/**
 * @fileoverview Hook for fetching and validating a single showing by its slug.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import HttpResponseError from "@/shared/_err/HttpResponseError.ts";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import {SlugQueryConfig} from "@/shared/_types";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {findBySlug} from "@/domains/showings/_feat/crud";
import {ShowingCRUDQueryKeys} from "@/domains/showings/_feat/crud-hooks/keys";

/** Fetches a showing by slug and validates the response against a schema. */
export function useFetchShowingBySlug<TData = unknown>(
    {slug, config, options, schema}: SlugQueryConfig<TData>
): UseQueryResult<TData, HttpResponseError> {
    const fetchShowing = buildQueryFn<TData>({
        action: () => findBySlug({slug, config}),
        schema,
    });

    return useQuery({
        queryKey: ShowingCRUDQueryKeys.slug({slug, ...config}),
        queryFn: fetchShowing,
        ...useQueryOptionsDefaults(options),
    });
}
