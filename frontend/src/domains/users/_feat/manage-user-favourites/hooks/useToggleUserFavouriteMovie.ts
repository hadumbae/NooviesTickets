/**
 * @file Mutation hook for toggling a user's favourite movie.
 * useToggleUserFavouriteMovie.ts
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {ObjectIdString} from "@noovies-tickets/common";
import {patchToggleUserFavouriteMovie} from "@/domains/users/_feat/manage-user-favourites/repository";
import {MovieClientViewDataQueryKeys} from "@/domains/movies/_feat/client-view-data/hooks/queryKeys.ts";
import {ManageUserFavouritesMutationKeys} from "@/domains/users/_feat/manage-user-favourites/hooks/mutationKeys.ts";
import {ManageUserFavouritesQueryKeys} from "@/domains/users/_feat/manage-user-favourites/hooks/queryKeys.ts";

/** Performs a favourite toggle mutation for the current user. */
export function useToggleUserFavouriteMovie(): UseMutationResult<ObjectIdString, unknown, ObjectIdString> {
    const queryClient = useQueryClient();

    const toggleFavouriteMovie = async (movieID: ObjectIdString) => {
        await patchToggleUserFavouriteMovie(movieID);
        return movieID;
    }

    const onSuccess = async () => {
        await queryClient.invalidateQueries({queryKey: ManageUserFavouritesQueryKeys.fetchCurrent(), exact: false});
        await queryClient.invalidateQueries({queryKey: MovieClientViewDataQueryKeys.all, exact: false,});
        await queryClient.invalidateQueries({queryKey: ManageUserFavouritesQueryKeys.all, exact: false,});
    }

    return useMutation({
        mutationKey: ManageUserFavouritesMutationKeys.toggleMovie(),
        mutationFn: toggleFavouriteMovie,
        onSuccess,
    });
}