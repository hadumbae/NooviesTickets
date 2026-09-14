/** @fileoverview Confirmation dialog for deleting movie credits with integrated mutation logic. */

import {ReactElement, ReactNode} from 'react';
import {ObjectIdString} from "@noovies-tickets/common";
import {
    EntityDeleteWarningDialog
} from "@/views/shared/_feat/dialog/EntityDeleteWarningDialog.tsx";
import {MutationResponseConfig} from "@/shared/_feat/submit-data";
import {UIOpenStateProps} from "@/shared/_types";
import {
    handleSubmitResponseError
} from "@/shared/_feat/error-handling/handleSubmitResponseError.ts";
import {handleMutationCallback} from "@/shared/_feat/handle-mutation-callback";
import {useMovieCreditDeleteMutation} from "@/domains/movie-credits";

/** Props for the MovieCreditDeleteWarningDialog component. */
type WarningDialogProps = MutationResponseConfig & UIOpenStateProps & {
    children?: ReactNode;
    _id: ObjectIdString;
    displayText?: string;
    displayDescription?: string;
}

/** Renders a warning dialog that triggers a movie credit deletion mutation upon user confirmation. */
export function MovieCreditDeleteWarningDialog(
    props: WarningDialogProps
): ReactElement {
    const {children, _id, displayText, displayDescription, isOpen, setIsOpen, ...mutationConfig} = props;

    const dialogTitle = `Proceed to delete ${displayText ?? "credit"}?`;
    const {mutateAsync} = useMovieCreditDeleteMutation();

    const deleteCredit = async () => {
        try {
            handleMutationCallback({
                message: mutationConfig.submitMessage,
                cb: () => mutationConfig.onSubmit?.(),
            });

            await mutateAsync({_id});

            handleMutationCallback({
                message: mutationConfig.submitMessage,
                messageType: "success",
                cb: () => mutationConfig.onSubmit?.(),
            });
        } catch (error: unknown) {
            handleSubmitResponseError({error, displayMessage: mutationConfig.errorMessage});
            mutationConfig.onSubmitError?.(error);
        }
    }

    return (
        <EntityDeleteWarningDialog
            title={dialogTitle}
            description={displayDescription}
            deleteResource={deleteCredit}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            {children}
        </EntityDeleteWarningDialog>
    );
}