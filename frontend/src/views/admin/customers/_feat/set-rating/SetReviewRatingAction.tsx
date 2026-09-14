/**
 * @fileoverview Orchestrator component for the Set Review Rating administrative action.
 */

import {ObjectIdString} from "@noovies-tickets/common";
import {SetReviewRatingFormData} from "@/domains/movie-reviews/_feat/admin-actions/set-review-rating";
import {ReactElement, useState} from "react";
import {Button} from "@/views/shared/_comp/ui/button.tsx";
import {MutationFormResetConfig, MutationResponseConfig} from "@/shared/_feat/submit-data";
import {MovieReview} from "@/domains/movie-reviews/_schema/model/MovieReviewSchema.ts";
import {SetReviewRatingDialog} from "@/views/admin/customers/_feat/set-rating/SetReviewRatingDialog.tsx";
import {SetReviewRatingForm} from "@/views/admin/customers/_feat/set-rating/SetReviewRatingForm.tsx";


/** Props for the SetReviewRatingAction component. */
type ActionProps = {
    reviewID: ObjectIdString;
    presetValues?: Partial<SetReviewRatingFormData>;
    submitConfig?: MutationResponseConfig<MovieReview, SetReviewRatingFormData> & MutationFormResetConfig;
};

/**
 * Encapsulates the state, form logic, and dialog for administrative rating overrides.
 */
export function SetReviewRatingAction(
    {reviewID, presetValues, submitConfig}: ActionProps
): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const closeOnSuccess = (review: MovieReview) => {
        setIsOpen(false);
        submitConfig?.onSubmitSuccess?.(review);
    };

    return (
        <SetReviewRatingForm
            mutConfig={{reviewID}}
            presetValues={presetValues}
            {...submitConfig}
            onSubmitSuccess={closeOnSuccess}
        >
            <SetReviewRatingDialog isOpen={isOpen} setIsOpen={setIsOpen}>
                <Button variant="outline" size="tile">
                    Set Review Rating
                </Button>
            </SetReviewRatingDialog>
        </SetReviewRatingForm>
    );
}