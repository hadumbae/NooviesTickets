/**
 * @fileoverview Hook for managing the deletion of seat records through asynchronous mutations and lifecycle callbacks.
 */

import {useSeatDeleteMutation} from "@/domains/seats/_feat/crud-hooks/submit/useSeatDeleteMutation.ts";
import {handleMutationCallback} from "@/shared/_feat/handle-mutation-callback";
import {
    handleSubmitResponseError
} from "@/shared/_feat/error-handling/handleSubmitResponseError.ts";
import {MutationResponseConfig} from "@/shared/_feat/submit-data";
import {ObjectIdString} from "@noovies-tickets/common";

type HandlerConfig = MutationResponseConfig<void, { _id: ObjectIdString }> & {
    _id: ObjectIdString;
};

type HandlerReturns = {
    deleteSeat: () => Promise<void>;
    isPending?: boolean;
    isError?: boolean;
}

/**
 * Handles the seat deletion process by executing the mutation and triggering configured lifecycle callbacks.
 */
export function useDeleteSeatSubmitHandler(
    {_id, ...submitConfig}: HandlerConfig
): HandlerReturns {
    const {mutateAsync, isPending, isError} = useSeatDeleteMutation();

    const deleteSeat = async () => {
        try {
            handleMutationCallback({
                message: submitConfig.submitMessage,
                cb: () => submitConfig.onSubmit?.({_id}),
            });

            await mutateAsync({_id: _id});

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

    return {
        deleteSeat,
        isPending,
        isError,
    };
}