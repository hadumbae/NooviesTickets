/**
 * @fileoverview React Query hook for fetching paginated theatres filtered by a location target.
 */

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {FetchQueryOptions} from "@/shared/_types/fetch-queries/FetchQueryOptions.ts";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {PaginatedItems} from "@/shared/_types";
import {HttpResponseError, generatePaginationSchema} from "@noovies-tickets/common";

import {TheatreWithRecentShowings, TheatreWithRecentShowingsSchema} from "@/domains/theatres/_schema";
import {SearchTheatreQueryKeys} from "@/domains/theatres/_feat/search-theatres/fetch/queryKeys.ts"
import {BrowseTheatreByLocationConfig, theatresByLocation} from "@/domains/theatres/_feat/search-theatres/repository";

/** Props for the useFetchTheatresByLocation component. */
type LocationParams = BrowseTheatreByLocationConfig & {
    options?: FetchQueryOptions<PaginatedItems<TheatreWithRecentShowings>>;
};

/**
 * Fetches paginated theatres filtered by a location target.
 */
export function useFetchTheatresByLocation(
    {page, perPage, target, country, showingsPerTheatre, options}: LocationParams,
): UseQueryResult<PaginatedItems<TheatreWithRecentShowings>, HttpResponseError> {
    const fetchByLocation = buildQueryFn<PaginatedItems<TheatreWithRecentShowings>>({
        action: () => theatresByLocation({page, perPage, target, country, showingsPerTheatre}),
        schema: generatePaginationSchema(TheatreWithRecentShowingsSchema),
    });

    return useQuery({
        queryKey: SearchTheatreQueryKeys.byLocation({page, perPage, target, country, showingsPerTheatre}),
        queryFn: fetchByLocation,
        ...useQueryOptionsDefaults(options),
    });
}