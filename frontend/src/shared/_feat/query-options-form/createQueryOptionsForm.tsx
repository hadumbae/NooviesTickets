/**
 * @fileoverview Factory for generating type-safe query option forms and hooks to manage search parameters.
 */

import {ReactElement, useRef} from "react";
import {z, ZodObject, ZodRawShape} from "zod";
import {DefaultValues, FieldValues, useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {isEqual} from "lodash";
import {Form} from "@/views/shared/_comp/ui";
import {generateQueryFormDefaultValues} from "@/shared/_feat/handle-form/generateQueryFormDefaultValues.ts";
import {QueryOptionsFormContextProvider} from "@/shared/_feat/query-options-form-context/provider.tsx";
import {useGenerateFormID} from "@/shared/_feat/generate-form-keys/useGenerateFormID.ts";
import {QueryOptionsFormContainerProps, QueryOptionsFormValues} from "@/shared/_feat/query-options-form/types.ts";

type FactoryConfig<TShape extends ZodRawShape> = {
    name: string;
    schema: ZodObject<TShape>;
};

type FactoryReturns<TFormValues extends FieldValues, TOptions extends FieldValues> = {
    useQueryOptionsForm: (config: QueryOptionsFormValues<TFormValues, TOptions>) => UseFormReturn<TFormValues, unknown, TOptions>;
    QueryOptionsForm: (props: QueryOptionsFormContainerProps<TFormValues, TOptions>) => ReactElement;
};

/** Generates a specialised form hook and container component for managing search and filter query options. */
export function createQueryOptionsForm<
    TFormValues extends FieldValues,
    TShape extends ZodRawShape,
    TOptions extends FieldValues = z.infer<ZodObject<TShape>>
>(
    {name, schema}: FactoryConfig<TShape>
): FactoryReturns<TFormValues, TOptions> {
    const formDefaults = generateQueryFormDefaultValues({schema});

    function useDefaultValues(
        {presetValues, queryOptions}: QueryOptionsFormValues<TFormValues, TOptions>
    ): TFormValues {
        const initialValues = {
            ...formDefaults,
            ...queryOptions,
            ...presetValues,
        } as TFormValues;

        const heldValues = useRef<TFormValues>(initialValues);

        if (!isEqual(heldValues.current, initialValues)) {
            heldValues.current = initialValues;
        }

        return heldValues.current;
    }

    function useQueryOptionsForm(
        config: QueryOptionsFormValues<TFormValues, TOptions>
    ): UseFormReturn<TFormValues, unknown, TOptions> {
        const defaultValues = useDefaultValues(config);

        return useForm<TFormValues, unknown, TOptions>({
            resolver: zodResolver(schema),
            defaultValues: defaultValues as DefaultValues<TFormValues>,
        });
    }

    function QueryOptionsForm(
        params: QueryOptionsFormContainerProps<TFormValues, TOptions>
    ): ReactElement {
        const {children, activeOptions, queryOptions, setQueryOptions, presetValues} = params;

        const formID = useGenerateFormID(name);
        const form = useQueryOptionsForm({presetValues, queryOptions});

        const resetForm = () => form.reset(formDefaults as DefaultValues<TFormValues>);
        const updateSearchParams = (values: TOptions) => setQueryOptions(values);

        return (
            <QueryOptionsFormContextProvider
                formID={formID}
                submitHandler={updateSearchParams}
                resetValues={resetForm}
                activeOptions={activeOptions}
            >
                <Form {...form}>
                    <form id={formID}
                          onSubmit={form.handleSubmit(updateSearchParams as Parameters<typeof form.handleSubmit>[0])}>
                        {children}
                    </form>
                </Form>
            </QueryOptionsFormContextProvider>
        );
    }

    return {useQueryOptionsForm, QueryOptionsForm};
}