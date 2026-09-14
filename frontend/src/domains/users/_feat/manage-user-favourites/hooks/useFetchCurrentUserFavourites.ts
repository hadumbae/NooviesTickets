/**
 * @file useFetchCurrentUserFavourites.ts
 * Query hook for fetching current user's favourite movies.
 */

import {FetchQueryOptions} from "@/common/_types/fetch-queries/FetchQueryOptions.ts";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useQueryOptionDefaults} from "@/common/_feat/handle-query/useQueryOptionDefaults.ts";
import {PaginationOptions} from "@noovies-tickets/common";
import {getUserFavourites} from "@/domains/users/_feat/manage-user-favourites/repository";
import {ManageUserFavouritesQueryKeys} from "@/domains/users/_feat/manage-user-favourites/hooks/queryKeys.ts";
import {buildQueryFn} from "@/common/_feat/validate-fetch-data";
import {generatePaginationSchema} from "@noovies-tickets/common";
import {MovieDetails, MovieDetailsSchema} from "@/domains/movies/_schema/movie/MovieDetailsSchema.ts";
import {PaginatedItems} from "@/common/_types";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";

/** Pagination params with optional query options. */
type FetchParams = Partial<PaginationOptions> & {
    options?: FetchQueryOptions<PaginatedItems<MovieDetails>>
}

/**
 * Fetches the authenticated user's favourite movies.
 */
export function useFetchCurrentUserFavourites(
    {page = 1, perPage = 10, options}: FetchParams
): UseQueryResult<PaginatedItems<MovieDetails>, HttpResponseError> {
    const fetchUserFavourites = buildQueryFn({
        action: () => getUserFavourites({page, perPage}),
        schema: generatePaginationSchema(MovieDetailsSchema),
    });

    return useQuery({
        queryKey: ManageUserFavouritesQueryKeys.fetchCurrent(),
        queryFn: fetchUserFavourites,
        ...useQueryOptionDefaults(options),
    });
}
