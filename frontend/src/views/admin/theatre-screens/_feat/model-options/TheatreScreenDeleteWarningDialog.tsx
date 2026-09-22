/**
 * @fileoverview Specialized confirmation dialog for Theatre Screen deletion workflows.
 */

import {ReactElement, ReactNode} from 'react';
import {ObjectIdString} from "@noovies-tickets/common";
import {
    EntityDeleteWarningDialog
} from "@/views/shared/_feat/dialog/EntityDeleteWarningDialog.tsx";
import {MutationResponseConfig} from "@/shared/_feat/submit-data";
import {useTheatreScreenDeleteMutation} from "@/domains/theatre-screens/_feat/crud-hooks";
import {UIOpenStateProps} from "@/shared/_types";
import {handleMutationCallback} from "@/shared/_feat/handle-mutation-callback";
import {
    handleSubmitResponseError
} from "@/shared/_feat/error-handling/handleSubmitResponseError.ts";

/** Props for the TheatreScreenDeleteWarningDialog component. */
type DialogProps = MutationResponseConfig<void, { _id: ObjectIdString }> & UIOpenStateProps & {
    children?: ReactNode;
    screenID: ObjectIdString;
    screenName?: string;
};

/** A domain-specific warning dialog that confirms a user's intent to delete a Theatre Screen. */
export function TheatreScreenDeleteWarningDialog(
    {children, screenID, screenName, isOpen, setIsOpen, ...submitConfig}: DialogProps
): ReactElement {
    const dialogTitle = `Proceed to delete ${screenName ?? "screen"}?`;
    const {mutateAsync} = useTheatreScreenDeleteMutation();

    const deleteScreen = async () => {
        try {
            handleMutationCallback({
                cb: () => submitConfig.onSubmit?.({_id: screenID}),
                message: submitConfig.submitMessage,
            });

            await mutateAsync({_id: screenID});

            handleMutationCallback({
                cb: () => submitConfig.onSubmitSuccess?.(),
                message: submitConfig.successMessage,
                messageType: "success"
            });
        } catch (error: unknown) {
            handleSubmitResponseError({error, displayMessage: submitConfig.errorMessage});
            submitConfig.onSubmitError?.(error);
        }
    };

    return (
        <EntityDeleteWarningDialog
            deleteResource={deleteScreen}
            title={dialogTitle}
            description="This action is permanent and will remove all associated seat configurations."
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            {children}
        </EntityDeleteWarningDialog>
    );
}