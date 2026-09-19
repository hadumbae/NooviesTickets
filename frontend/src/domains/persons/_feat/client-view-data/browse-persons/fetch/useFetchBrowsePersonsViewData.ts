/**
 * @fileoverview Hook for fetching and validating paginated person data for the browse view.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import {FetchQueryOptions} from "@/shared/_types/fetch-queries/FetchQueryOptions.ts";
import {HttpResponseError} from "@noovies-tickets/common";
import {PersonClientViewQueryKeys} from "@/domains/persons/_feat/client-view-data/keys";
import {getFetchBrowsePersonsViewData,} from "@/domains/persons/_feat/client-view-data/repository";
import {
    BrowsePersonsQueryOptions,
} from "@/domains/persons/_feat/validate-query-options/person-browse/BrowsePersonsQueryOptionsSchema.ts";
import {
    BrowsePersonsViewData,
    BrowsePersonsViewDataSchema,
} from "@/domains/persons/_feat/client-view-data/browse-persons/schema";

/** Configuration for fetching browse persons view data. */
type FetchConfig = {
    page?: number;
    perPage?: number;
    queries?: BrowsePersonsQueryOptions;
    options?: FetchQueryOptions<BrowsePersonsViewData>;
};

/** Fetches and validates composite data for the Browse Persons client view. */
export function useFetchBrowsePersonsViewData(
    {page, perPage, queries, options}: FetchConfig
): UseQueryResult<BrowsePersonsViewData, HttpResponseError> {
    const fetchPersons = buildQueryFn<BrowsePersonsViewData>({
        action: () => getFetchBrowsePersonsViewData({page, perPage, queries}),
        schema: BrowsePersonsViewDataSchema,
    });

    return useQuery({
        queryKey: PersonClientViewQueryKeys.browse({page, perPage, ...queries}),
        queryFn: fetchPersons,
        ...useQueryOptionsDefaults(options),
    });
}