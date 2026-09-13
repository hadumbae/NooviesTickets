/**
 * @fileoverview Mutation hook for deleting a movie review belonging to the current user.
 */

import {ObjectIdString} from "@noovies-tickets/common";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {deleteRemoveMovieReviewForCurrentUser} from "@/domains/movie-reviews/_feat/my-reviews/repository/repository.ts";
import {toast} from "react-toastify";
import {handleSubmitResponseError} from "@/common/_feat/error-handling/handleSubmitResponseError.ts";
import {FetchByMovieQueryKeys} from "@/domains/movie-reviews/_feat/fetch-by-movie/fetch/queryKeys.ts";
import {MovieReviewCRUDQueryKeys} from "@/domains/movie-reviews/_feat/crud-hooks/queryKeys.ts";
import {MyReviewsMutationKeys} from "@/domains/movie-reviews/_feat/my-reviews/hooks/mutationKeys.ts";
import {MutationResponseConfig} from "@/common/_feat/submit-data/mutationTypes.ts";

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
        queryClient.invalidateQueries({queryKey: MovieReviewCRUDQueryKeys.list(), exact: true});
        queryClient.invalidateQueries({queryKey: FetchByMovieQueryKeys.all, exact: true});

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