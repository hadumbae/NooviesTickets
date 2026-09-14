/**
 * @fileoverview Factory function and component for creating multi-step form containers with context state.
 */

import {ReactElement, ReactNode} from "react";
import {DefaultValues, FieldValues} from "react-hook-form";
import {Form} from "@/views/shared/_comp/ui/form.tsx";
import {FormValuesConfig, MutationFormResetConfig, MutationResponseConfig} from "@/shared/_feat/submit-data";
import {useGenerateFormID} from "@/shared/_feat/generate-form-keys";
import {createFormSubmitHandler} from "@/shared/_feat/forms/createFormSubmitHandler.ts";
import {BaseMultiStepFormContextProvider} from "@/views/shared/_feat/multi-step-form/contexts/BaseMultiStepFormContextProvider.tsx";
import {FormContainerFactoryConfig, FormMutationConfig} from "@/shared/_feat/forms/FormFactoryTypes";
import {MultiStepFormStorageConfig} from "@/shared/_feat/multi-step-form/types.ts";

/** Props for the factory-generated multi-step form container component. */
export type FactoryMultiStepFormContainerProps<
    TFormValues extends FieldValues,
    TForm extends FieldValues = TFormValues,
    TEditEntity = unknown,
    TReturns = void,
    TMutConfig = void,
> =
    MutationResponseConfig<TReturns, TForm>
    & MutationFormResetConfig
    & FormValuesConfig<TFormValues, TEditEntity>
    & MultiStepFormStorageConfig
    & FormMutationConfig<TMutConfig>
    & {
    children: ReactNode;
    resetValues?: DefaultValues<TFormValues>;
}

/**
 * Creates a multi-step form container component configured with state context and submission handling.
 */
export function createMultiStepFormContainer<
    TFormValues extends FieldValues,
    TForm extends FieldValues = TFormValues,
    TEditEntity = unknown,
    TReturns = void,
    TMutConfig = void,
>(
    params: FormContainerFactoryConfig<TFormValues, TForm, TEditEntity, TReturns, TMutConfig>
): (props: FactoryMultiStepFormContainerProps<TFormValues, TForm, TEditEntity, TReturns, TMutConfig>) => ReactElement {
    const {formName, useSubmitForm, mutation} = params;

    function SubmitForm(
        props: FactoryMultiStepFormContainerProps<TFormValues, TForm, TEditEntity, TReturns, TMutConfig>
    ): ReactElement {
        const {
            children,
            presetValues,
            editEntity,
            mutConfig,
            resetValues,
            localStorageKey,
            storageType = "session",
            useStorage = true,
            ...submitConfig
        } = props;

        const formID = useGenerateFormID(formName);

        const form = useSubmitForm({presetValues, editEntity});
        const {formState: {errors}, getValues} = form
        type FormSubmitHandler = Parameters<typeof form.handleSubmit>[0];

        const {mutateAsync, isPending, isError} = mutation(mutConfig as TMutConfig);

        if (Object.keys(errors).length > 0) {
            console.debug("Form Values:", getValues());
            console.debug("Form Errors:", errors);
        }

        const submitData = createFormSubmitHandler({
            form,
            mutateAsync,
            resetValues,
            ...submitConfig,
        }) as FormSubmitHandler;

        return (
            <BaseMultiStepFormContextProvider
                formID={formID}
                isPending={isPending}
                isError={isError}
                localStorageKey={localStorageKey}
                storageType={storageType}
                useStorage={useStorage}
                submitHandler={submitData}
            >
                <Form {...form}>
                    <form id={formID} onSubmit={form.handleSubmit(submitData)}>
                        {children}
                    </form>
                </Form>
            </BaseMultiStepFormContextProvider>
        );
    }

    return SubmitForm;
}