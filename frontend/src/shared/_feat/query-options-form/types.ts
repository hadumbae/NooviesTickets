/**
 * @fileoverview Defines types and interfaces for the query options form components.
 */

import {FieldValues} from "react-hook-form";
import {ReactNode} from "react";
import {DisableFields, HideFields} from "@/shared/_types";

/** Represents the combined state of preset values and active query options. */
export type QueryOptionsFormValues<TPreset extends FieldValues, TOptions extends FieldValues = TPreset> = {
    presetValues?: Partial<TPreset>;
    queryOptions: TOptions;
};

/** Configuration for updating query options and tracking active filter counts. */
export type QueryOptionsSetterConfig<TOptions = unknown> = {
    setQueryOptions: (values: TOptions) => void;
    activeOptions: number;
}

/** Props for the QueryOptionsFormContainer component. */
export type QueryOptionsFormContainerProps<TPreset extends FieldValues, TOptions extends FieldValues = TPreset> =
    QueryOptionsFormValues<TPreset, TOptions> & QueryOptionsSetterConfig<TOptions> & {
    children: ReactNode;
};

/** CSS class names for styling the query option form view. */
export type QueryOptionsFormViewClassNames = {
    container?: string;
    content?: string;
    filters?: string;
    sorts?: string;
}

/** Props for the QueryOptionsFormView component. */
export type QueryOptionsFormViewProps<TValues extends FieldValues> = {
    disableFields?: DisableFields<TValues>;
    hideFields?: HideFields<TValues>;
    classNames?: QueryOptionsFormViewClassNames;
};