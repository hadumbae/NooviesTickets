/** @fileoverview Confirmation dialogue for deleting a movie entity with integrated mutation logic. */

import {ReactElement, ReactNode} from 'react';
import {ObjectIdString} from "@noovies-tickets/common";
import {
    EntityDeleteWarningDialog
} from "@/views/shared/_feat/dialog/EntityDeleteWarningDialog.tsx";
import {MutationResponseConfig} from "@/shared/_feat/submit-data";
import {UIOpenStateProps} from "@/shared/_types";
import {useMovieDeleteMutation} from "@/domains/movies/_feat/crud-hooks";
import {handleMutationCallback} from "@/shared/_feat/handle-mutation-callback";
import {
    handleSubmitResponseError
} from "@/shared/_feat/error-handling/handleSubmitResponseError.ts";

/** Props for the MovieDeleteWarningDialog component, supporting controlled UI states and deletion callbacks. */
type WarningDialogProps = MutationResponseConfig<void, { _id: ObjectIdString }> & UIOpenStateProps & {
    children?: ReactNode;
    movieID: ObjectIdString;
    movieName?: string;
};

/** Renders a confirmation dialogue that triggers a movie deletion mutation upon user confirmation. */
export function MovieDeleteWarningDialog(
    {children, movieID, movieName, isOpen, setIsOpen, ...submitConfig}: WarningDialogProps
): ReactElement {
    const displayName = movieName ? `"${movieName}"` : "movie";
    const dialogTitle = `Proceed to delete ${displayName}?`;

    const {mutateAsync} = useMovieDeleteMutation();

    const deleteMovie = async () => {
        try {
            handleMutationCallback({
                message: submitConfig.submitMessage,
                cb: () => submitConfig.onSubmit?.({_id: movieID}),
            });

            await mutateAsync({_id: movieID});

            handleMutationCallback({
                message: submitConfig.successMessage,
                cb: () => submitConfig.onSubmitSuccess?.(),
                messageType: "success",
            });
        } catch (error: unknown) {
            handleSubmitResponseError({error, displayMessage: submitConfig.errorMessage});
            submitConfig.onSubmitError?.(error);
        }
    }

    return (
        <EntityDeleteWarningDialog
            title={dialogTitle}
            deleteResource={deleteMovie}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            {children}
        </EntityDeleteWarningDialog>
    );
}