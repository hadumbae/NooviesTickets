/**
 * @fileoverview Fieldset component for rendering movie index query filter form inputs.
 */

import {ReactElement} from 'react';
import {useFormContext} from "react-hook-form";
import {cn, createFormFieldConfig, FormViewProps, renderFields} from "@/shared/_feat";
import {MovieQueryOptionsFormValues} from "@/domains/movies/_feat/submit-queries/MovieQueryOptionsFormValues.ts";
import {HookFormCheckbox, HookFormInput} from "@/views/shared/_feat";
import {HookFormSelect} from "@/views/shared/_comp";
import {ISO3166Alpha2CountryOptions} from "@/shared/_const";
import {LabelledFormInput} from "@/views/admin/movies/_comp/form-display/LabelledFormInput.tsx";
import {ConditionalRenderConfig} from "@/shared/_types/form/HookFormFieldsetConfigTypes.ts";

/** Renders the form fields for filtering movie index query options. */
export function MovieIndexQueryOptionsFormFilterFieldset(
    {disableFields, hideFields, className}: FormViewProps<MovieQueryOptionsFormValues>
): ReactElement {
    const {control} = useFormContext();
    const field = createFormFieldConfig({disableFields, hideFields});

    const fields: ConditionalRenderConfig[] = [
        field({
            key: "title",
            element: <LabelledFormInput label="Title" classNames={{container: "md:col-span-2"}}>
                <HookFormInput name="title" control={control}/>
            </LabelledFormInput>
        }),
        field({
            key: "releaseDate",
            element: <LabelledFormInput label="Release Date">
                <HookFormInput name="releaseDate" type="date" control={control}/>
            </LabelledFormInput>
        }),
        field({
            key: "country",
            element: <LabelledFormInput label="Country">
                <HookFormSelect name="country" options={ISO3166Alpha2CountryOptions}/>
            </LabelledFormInput>
        }),
        field({
            key: "isReleased",
            element: <HookFormCheckbox name="isReleased" label="Is Released"/>
        }),
        field({
            key: "isAvailable",
            element: <HookFormCheckbox name="isAvailable" label="Is Available"/>
        }),
    ];

    return (
        <fieldset className={cn("grid grid-cols-1 md:md:grid-cols-2 xl:grid-cols-3 gap-4", className)}>
            {renderFields({fields})}
        </fieldset>
    );
}