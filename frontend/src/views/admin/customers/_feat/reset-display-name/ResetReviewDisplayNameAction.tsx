/**
 * @fileoverview Orchestrator component for the Reset Display Name administrative action.
 */

import {ObjectIdString} from "@noovies-tickets/common";
import {ResetReviewDisplayNameFormData} from "@/domains/movie-reviews/_feat/admin-actions/reset-review-display-name";
import {ReactElement, useState} from "react";
import {Button} from "@/views/shared/_comp/ui/button.tsx";
import {MovieReview} from "@/domains/movie-reviews/_schema/model/MovieReviewSchema.ts";
import {ResetReviewDisplayNameDialog} from "@/views/admin/customers/_feat/reset-display-name/ResetReviewDisplayNameDialog.tsx";
import {ResetReviewDisplayNameForm} from "@/views/admin/customers/_feat/reset-display-name/ResetReviewDisplayNameForm.tsx";
import {MutationFormResetConfig, MutationResponseConfig} from "@/shared/_feat/submit-data";

/** Props for the ResetReviewDisplayNameAction component. */
type ActionProps = {
    reviewID: ObjectIdString;
    presetValues?: Partial<ResetReviewDisplayNameFormData>;
    submitConfig?: MutationResponseConfig<MovieReview, ResetReviewDisplayNameFormData> & MutationFormResetConfig;
};

/**
 * Composite component that bundles the form logic, dialog state, and trigger button for resetting a review display name.
 */
export function ResetReviewDisplayNameAction(
    {reviewID, presetValues, submitConfig}: ActionProps
): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const closeOnSuccess = (review: MovieReview) => {
        setIsOpen(false);
        submitConfig?.onSubmitSuccess?.(review);
    };

    return (
        <ResetReviewDisplayNameForm
            mutConfig={{reviewID}}
            presetValues={presetValues}
            {...submitConfig}
            onSubmitSuccess={closeOnSuccess}
        >
            <ResetReviewDisplayNameDialog
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            >
                <Button variant="outline" size="tile">
                    Reset Display Name
                </Button>
            </ResetReviewDisplayNameDialog>
        </ResetReviewDisplayNameForm>
    );
}