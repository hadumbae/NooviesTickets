/**
 * @fileoverview React Query hook to check if a movie is in the user's favourites.
 */

import {HttpResponseError, ObjectIdString} from "@noovies-tickets/common";
import { FetchQueryOptions } from "@/shared/_types/fetch-queries/FetchQueryOptions.ts";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {useQueryOptionsDefaults} from "@/shared/_feat/handle-query/useQueryOptionsDefaults.ts";
import {buildQueryFn} from "@/shared/_feat/validate-fetch-data";
import {IsFavouriteMovieMetadata, IsFavouriteMovieSchema} from "@/domains/users/_feat/manage-user-favourites/schema";
import {getCheckIsFavouriteMovie} from "@/domains/users/_feat/manage-user-favourites/repository";
import {ManageUserFavouritesQueryKeys} from "@/domains/users/_feat/manage-user-favourites/hooks/queryKeys.ts";

/** Parameters for the useCheckIsFavouriteMovie hook. */
type FetchParams = {
    _id: ObjectIdString;
    options?: FetchQueryOptions<unknown>;
};

/** Queries whether the specified Movie is in the user's favourites. */
export function useCheckIsFavouriteMovie(
    { _id, options }: FetchParams
): UseQueryResult<IsFavouriteMovieMetadata, HttpResponseError> {
    const getCheckMovie = buildQueryFn({
        action: () => getCheckIsFavouriteMovie(_id),
        schema: IsFavouriteMovieSchema,
    });

    return useQuery({
        queryKey: ManageUserFavouritesQueryKeys.checkMovie({_id}),
        queryFn: getCheckMovie,
        ...useQueryOptionsDefaults(options),
    });
}