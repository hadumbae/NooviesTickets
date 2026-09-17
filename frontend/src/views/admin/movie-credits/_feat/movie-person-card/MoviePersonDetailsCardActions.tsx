/**
 * @fileoverview Hidden container for movie credit edit and delete dialogs.
 */

import {Dispatch, ReactElement, SetStateAction} from "react";
import {MovieCreditForm} from "@/views/admin/movie-credits/_feat/submit-form/MovieCreditForm.tsx";
import {MovieCreditFormPanel} from "@/views/admin/movie-credits/_feat/submit-form/views/MovieCreditFormPanel.tsx";
import {
    MovieCreditDeleteWarningDialog
} from "@/views/admin/movie-credits/_feat/delete-credit/MovieCreditDeleteWarningDialog.tsx";

import {MovieCredit} from "@noovies-tickets/common";

/** Props for the MoviePersonDetailsCardActions component. */
type ActionProps = {
    className?: string;
    credit: MovieCredit;
    isEditing: boolean;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
    isDeleting: boolean;
    setIsDeleting: Dispatch<SetStateAction<boolean>>;
};

/** Renders the form and delete dialogs for managing a specific movie credit. */
export function MoviePersonDetailsCardActions(
    {className, credit, isEditing, setIsEditing, isDeleting, setIsDeleting}: ActionProps
): ReactElement {
    return (
        <div className={className}>
            <MovieCreditForm
                onSubmitSuccess={() => setIsEditing(false)}
                successMessage="Updated."
                editEntity={credit}
            >
                <MovieCreditFormPanel
                    hideFields={{person: true, department: true}}
                    isOpen={isEditing}
                    setIsOpen={setIsEditing}
                />
            </MovieCreditForm>

            <MovieCreditDeleteWarningDialog
                _id={credit._id}
                isOpen={isDeleting}
                setIsOpen={setIsDeleting}
            />
        </div>
    );
}