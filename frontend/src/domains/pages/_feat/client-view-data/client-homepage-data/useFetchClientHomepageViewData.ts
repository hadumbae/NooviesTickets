/**
 * @fileoverview React Query hook for fetching and runtime-validating client homepage view data.
 */

import {FetchQueryOptions} from "@/shared/_types";
import {
    ClientHomepageViewData,
    ClientHomepageViewDataSchema
} from "@/domains/pages/_feat/client-view-data/client-homepage-data/ClientHomepageViewDataSchema.ts";
import {
    ClientHomepageViewRouteConfig
} from "@/domains/pages/_feat/client-view-data/client-homepage-data/ClientHomepageViewRouteConfigSchema.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {HttpResponseError} from "@noovies-tickets/common";
import {buildQueryFn, useQueryOptionsDefaults} from "@/shared/_feat";
import {
    getFetchClientHomepageViewData
} from "@/domains/pages/_feat/client-view-data/client-homepage-data/getFetchClientHomepageViewData.ts";
import {ClientHomepageQueryKeys} from "@/domains/pages/_feat/client-view-data/queryKeys.ts";

/** Configuration options for the homepage view data query hook. */
type FetchConfig = {
    queries?: ClientHomepageViewRouteConfig;
    options?: FetchQueryOptions<ClientHomepageViewData>;
};

/** Fetches and validates composite homepage view data using React Query. */
export function useFetchClientHomepageViewData(
    {queries, options}: FetchConfig = {}
): UseQueryResult<ClientHomepageViewData, HttpResponseError> {
    const fetchData = buildQueryFn({
        action: () => getFetchClientHomepageViewData({queries}),
        schema: ClientHomepageViewDataSchema,
    });

    return useQuery({
        queryKey: ClientHomepageQueryKeys.homepage(queries),
        queryFn: fetchData,
        ...useQueryOptionsDefaults(options),
    })
}