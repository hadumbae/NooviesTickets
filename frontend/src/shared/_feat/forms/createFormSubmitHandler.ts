/**
 * @fileoverview Factory function for creating React Hook Form submit handlers with mutation lifecycle callbacks.
 */

import {handleFormSubmitError} from "@/shared/_feat/error-handling/handleFormSubmitError.ts";
import {handleMutationCallback} from "@/shared/_feat/handle-mutation-callback/handleMutationCallback.ts";
import {MutationFormResetConfig, MutationResponseConfig} from "@/shared/_feat/submit-data/mutationTypes.ts";
import {DefaultValues, FieldValues, UseFormReturn} from "react-hook-form";
import {UseMutateAsyncFunction} from "@tanstack/react-query";

/** Configuration options for the form submit handler factory. */
type FactoryConfig<TFormValues extends FieldValues, TForm extends FieldValues = TFormValues, TReturns = void> =
    MutationResponseConfig<TReturns, TForm> & MutationFormResetConfig & {
    form: UseFormReturn<TFormValues, unknown, TForm>;
    resetValues?: DefaultValues<TFormValues>;
    mutateAsync: UseMutateAsyncFunction<TReturns, unknown, TForm, unknown>;
};

/**
 * Creates an asynchronous submit handler that manages form resetting, mutation execution, and error handling.
 */
export function createFormSubmitHandler<TFormValues extends FieldValues, TForm extends FieldValues = TFormValues, TReturns = void>(
    {
        form,
        resetValues,
        mutateAsync,
        onSubmit,
        onSubmitSuccess,
        onSubmitError,
        submitMessage,
        successMessage,
        errorMessage,
        resetOnSubmit,
        resetOnSuccess,
        resetOnError
    }: FactoryConfig<TFormValues, TForm, TReturns>
) {
    return async (values: TForm) => {
        try {
            if (resetOnSubmit) {
                form.reset(resetValues);
            }

            handleMutationCallback({
                message: submitMessage,
                cb: () => onSubmit?.(values),
            });

            const data = await mutateAsync(values);

            if (resetOnSuccess) {
                form.reset(resetValues);
            }

            handleMutationCallback({
                message: successMessage,
                cb: () => onSubmitSuccess?.(data),
                messageType: "success",
            });
        } catch (error: unknown) {
            handleFormSubmitError({form, error, displayMessage: errorMessage});
            if (resetOnError) {
                form.reset(resetValues);
            }
            onSubmitError?.(error);
        }
    };
}