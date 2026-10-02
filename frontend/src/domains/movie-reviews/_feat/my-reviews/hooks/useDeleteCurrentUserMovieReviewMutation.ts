/**
 * @fileoverview Mutation hook for deleting a movie review belonging to the current user.
 */

import {ObjectIdString} from "@noovies-tickets/common";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {deleteRemoveMovieReviewForCurrentUser} from "@/domains/movie-reviews/_feat/my-reviews/repository/repository.ts";
import {toast} from "react-toastify";
import {handleSubmitResponseError} from "@/shared/_feat/error-handling/handleSubmitResponseError.ts";
import {FetchByMovieQueryKeys} from "@/domains/movie-reviews/_feat/fetch-by-movie/fetch/queryKeys.ts";
import {MovieReviewCRUDQueryKeys} from "@/domains/movie-reviews/_feat/crud-hooks/queryKeys.ts";
import {MyReviewsMutationKeys} from "@/domains/movie-reviews/_feat/my-reviews/hooks/mutationKeys.ts";
import {MutationResponseConfig} from "@/shared/_feat/submit-data/mutationTypes.ts";
import {MovieClientViewDataQueryKeys} from "@/domains/movies";
import {MyReviewsQueryKeys} from "@/domains/movie-reviews";

/** Parameters for the movie review deletion mutation. */
type MutateParams = {
    reviewID: ObjectIdString;
    movieID?: ObjectIdString;
}

/** Mutation hook for deleting a MovieReview owned by the current user. */
export function useDeleteCurrentUserMovieReviewMutation(
    {onSubmitSuccess, successMessage, onSubmitError, errorMessage}: MutationResponseConfig<void, MutateParams> = {}
): UseMutationResult<void, unknown, MutateParams> {
    const queryClient = useQueryClient();

    const deleteMovieReview = async (params: MutateParams) => {
        await deleteRemoveMovieReviewForCurrentUser(params.reviewID);
    }

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: MovieReviewCRUDQueryKeys.list(), exact: false});
        queryClient.invalidateQueries({queryKey: MovieClientViewDataQueryKeys.infoReviews(), exact: false});
        queryClient.invalidateQueries({queryKey: FetchByMovieQueryKeys.all, exact: false});
        queryClient.invalidateQueries({queryKey: FetchByMovieQueryKeys.featured(), exact: false});
        queryClient.invalidateQueries({queryKey: MyReviewsQueryKeys.current(), exact: false});


        if (successMessage) {
            toast.success(successMessage);
        }

        onSubmitSuccess?.();
    }

    const onError = (error: unknown) => {
        if (errorMessage) {
            toast.error(errorMessage);
        }

        handleSubmitResponseError({error});
        onSubmitError?.(error);
    }

    return useMutation({
        mutationKey: MyReviewsMutationKeys.destroy(),
        mutationFn: deleteMovieReview,
        onSuccess,
        onError,
    });
}