/**
 * @fileoverview Form component and hook exports for submitting a user movie review.
 */

import {createForm} from "@/shared/_feat";
import {
    MovieReview,
    MovieReviewForm,
    MovieReviewFormSchema,
    MovieReviewFormValues,
    useSubmitUserMovieReviewMutation
} from "@/domains/movie-reviews";

const {SubmitForm} = createForm<
    MovieReviewFormValues,
    MovieReviewForm,
    MovieReview,
    MovieReview
>({
    schema: MovieReviewFormSchema,
    mutation: useSubmitUserMovieReviewMutation,
    formName: "movie-review-submit-form",
    defaultValues: {
        movie: "",
        displayName: "",
        summary: "",
        reviewText: "",
        isRecommended: false,
        rating: "",
    }
});

export {
    /** Form component for submitting a user movie review. */
        SubmitForm as MovieReviewSubmitForm,
}