/**
 * @fileoverview Factory for creating collapsible query option form sections.
 */

import {ReactElement, useState} from "react";
import {FieldValues} from "react-hook-form";
import {QueryOptionsContextValues} from "@/shared/_feat/fetch-search-params/context";
import {QueryOptionsFormContainerProps, QueryOptionsFormViewProps} from "@/shared/_feat/query-options-form/types.ts";
import {QueryOptionsFormCollapsible} from "@/views/shared/_feat/query-options-form/QueryOptionsFormCollapsible.tsx";

type SectionConfig<TFormValues extends FieldValues, TOptions extends FieldValues> = {
    queryOptionsForm: (props: QueryOptionsFormContainerProps<TFormValues, TOptions>) => ReactElement;
    useQueryOptionsContext: () => QueryOptionsContextValues<TOptions>;
    formView: (props: QueryOptionsFormViewProps<TFormValues>) => ReactElement;
};

type SectionProps<TFormValues extends FieldValues> = QueryOptionsFormViewProps<TFormValues> & {
    disableClear?: boolean;
    triggerText?: string;
};

/** Creates a component that integrates query options context with a collapsible form view. */
export function createQueryOptionsFormSection<TFormValues extends FieldValues, TOptions extends FieldValues>(
    {queryOptionsForm: QueryOptionsForm, useQueryOptionsContext, formView: FormView}: SectionConfig<TFormValues, TOptions>
): (props: SectionProps<TFormValues>) => ReactElement {
    return function QueryOptionsFormSection(
        {disableFields, classNames, triggerText, disableClear = false}: SectionProps<TFormValues>
    ): ReactElement {
        const [isOpen, setIsOpen] = useState(false);
        const {values, setValues, activeOptions} = useQueryOptionsContext();

        return (
            <QueryOptionsForm queryOptions={values} setQueryOptions={setValues} activeOptions={activeOptions}>
                <QueryOptionsFormCollapsible
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    disableClear={disableClear}
                    triggerText={triggerText}
                    className={classNames?.content}
                >
                    <FormView disableFields={disableFields} classNames={classNames}/>
                </QueryOptionsFormCollapsible>
            </QueryOptionsForm>
        );
    };
}