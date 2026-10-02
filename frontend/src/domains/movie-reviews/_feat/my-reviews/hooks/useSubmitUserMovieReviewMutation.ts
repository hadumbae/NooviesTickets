/**
 * @fileoverview React Query mutation hook for creating or updating a MovieReview for the current user.
 */

import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {validateData} from "@/shared/_feat/validate-data/validateData.ts";
import {MovieReviewForm} from "@/domains/movie-reviews/_feat/submit-form/schema/MovieReviewFormSchema.ts";
import {MyReviewsMutationKeys} from "@/domains/movie-reviews/_feat/my-reviews/hooks/mutationKeys.ts";
import {
    patchUpdateMovieReviewForCurrentUser,
    postCreateMovieReviewForCurrentUser
} from "@/domains/movie-reviews/_feat/my-reviews/repository/repository.ts";
import {MovieClientViewDataQueryKeys} from "@/domains/movies";
import {FetchByMovieQueryKeys} from "@/domains/movie-reviews/_feat/fetch-by-movie/fetch/queryKeys.ts";
import {MovieReview, MovieReviewSchema} from "@/domains/movie-reviews/_schema/model/MovieReviewSchema.ts";
import {MyReviewsQueryKeys} from "@/domains/movie-reviews";

/** Mutation hook for creating or updating a MovieReview owned by the current user. */
export function useSubmitUserMovieReviewMutation(): UseMutationResult<MovieReview, unknown, MovieReviewForm> {

    const queryClient = useQueryClient();

    const submitReviewData = async ({_id, ...values}: MovieReviewForm) => {
        const payload = {
            data: values,
            config: {populate: true, virtuals: true}
        };

        const action = _id
            ? () => patchUpdateMovieReviewForCurrentUser({reviewID: _id, ...payload})
            : () => postCreateMovieReviewForCurrentUser(payload);

        const {result} = await action();

        console.log("Invalid Review: ", result);

        const {success, data: parsedData, error} = validateData({
            data: result,
            schema: MovieReviewSchema,
        });


        if (!success) {
            console.log("Errors: ", error.errors)
            throw error;
        }

        return parsedData;
    }

    const onSuccess = () => {
        queryClient.invalidateQueries({queryKey: MyReviewsMutationKeys.all, exact: false});
        queryClient.invalidateQueries({queryKey: MovieClientViewDataQueryKeys.infoReviews(), exact: false});
        queryClient.invalidateQueries({queryKey: FetchByMovieQueryKeys.featured(), exact: false});
        queryClient.invalidateQueries({queryKey: MyReviewsQueryKeys.current(), exact: false});
    }

    return useMutation({
        mutationKey: MyReviewsMutationKeys.submit(),
        mutationFn: submitReviewData,
        onSuccess,
    });
}