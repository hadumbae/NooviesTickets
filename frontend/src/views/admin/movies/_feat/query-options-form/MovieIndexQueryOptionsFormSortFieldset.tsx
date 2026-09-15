/**
 * @fileoverview Fieldset component for rendering movie index query sort options.
 */

import {ReactElement} from "react";
import {cn, createFormFieldConfig, renderFields} from "@/shared/_feat";
import {FormFieldsetProps} from "@/shared/_feat/submit-data/formTypes.ts";
import {HookFormSortToggle} from "@/views/shared/_feat";
import {MovieQueryOptionsFormValues} from "@/domains/movies/_feat/submit-queries/MovieQueryOptionsFormValues.ts";
import {ConditionalRenderConfig} from "@/shared/_types/form/HookFormFieldsetConfigTypes.ts";

/** Renders the form fields for sorting movie index query options. */
export function MovieIndexQueryOptionsFormSortFieldset(
    {disableFields, hideFields, className}: FormFieldsetProps<MovieQueryOptionsFormValues>
): ReactElement {
    const field = createFormFieldConfig({disableFields, hideFields});

    const fields: ConditionalRenderConfig[] = [
        field({
            key: "sortByTitle",
            element: <HookFormSortToggle name="sortByTitle" label="Title"/>
        }),
        field({
            key: "sortByReleaseDate",
            element: <HookFormSortToggle name="sortByReleaseDate" label="Release Date"/>
        }),
        field({
            key: "sortByCountry",
            element: <HookFormSortToggle name="sortByCountry" label="Country"/>
        }),
        field({
            key: "sortByIsReleased",
            element: <HookFormSortToggle name="sortByIsReleased" label="Is Released?"/>
        }),
        field({
            key: "sortByIsAvailable",
            element: <HookFormSortToggle name="sortByIsAvailable" label="Is Available?"/>
        }),
    ];

    return (
        <fieldset className={cn("flex flex-wrap", className)}>
            {renderFields({fields})}
        </fieldset>
    );
}