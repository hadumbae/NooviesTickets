/**
 * @fileoverview Data fetching hook for the administrative person profile view.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {SlugString} from "@noovies-tickets/common";
import {FetchQueryOptions} from "@/shared/_types/fetch-queries/FetchQueryOptions.ts";
import HttpResponseError from "@/shared/_err/HttpResponseError.ts";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {useQueryOptionDefaults} from "@/shared/_feat/handle-query/useQueryOptionDefaults.ts";
import {PersonAdminViewQueryKeys} from "@/domains/persons/_feat/admin-view-data/fetch/querykeys.ts";
import {getFetchPersonDetailsViewData} from "@/domains/persons/_feat/admin-view-data/repository";
import {PersonDetailsViewData, PersonDetailsViewSchema} from "@/domains/persons/_feat/admin-view-data/schema";

/**
 * Configuration for fetching person detail view data.
 */
type FetchConfig = {
    slug: SlugString;
    limit?: number;
    options?: FetchQueryOptions<PersonDetailsViewData>;
}

/**
 * Custom hook to fetch and validate the composite person detail view data.
 */
export function useFetchPersonDetailsViewData(
    {slug, limit, options}: FetchConfig
): UseQueryResult<PersonDetailsViewData, HttpResponseError> {
    const fetchDetails = buildQueryFn<PersonDetailsViewData>({
        action: () => getFetchPersonDetailsViewData({slug, limit}),
        schema: PersonDetailsViewSchema,
    });

    return useQuery({
        queryKey: PersonAdminViewQueryKeys.details({slug, limit}),
        queryFn: fetchDetails,
        ...useQueryOptionDefaults(options),
    });
}