/**
 * @fileoverview Fieldset component for movie production and release metadata.
 */

import {ReactElement} from "react";
import {useFormContext} from "react-hook-form";
import {MovieFormStarterValues} from "@/domains/movies/_feat/submit-data/schema/MovieFormSchema.ts";
import {Separator} from "@/views/shared/_comp/ui";
import {cn, createFormFieldConfig, renderFields, useBaseFormContext} from "@/shared/_feat";
import {FormFieldsetProps} from "@/shared/_feat/submit-data/formTypes.ts";
import {HookFormCheckbox, HookFormInput} from "@/views/shared/_feat";
import {HookFormMultiSelect, HookFormSelect} from "@/views/shared/_comp";
import {ISO3166Alpha2CountryOptions, ISO6391LanguageOptions} from "@/shared/_const";
import {ConditionalRenderConfig} from "@/shared/_types/form/HookFormFieldsetConfigTypes.ts";

/**
 * Renders form fields for country, runtime, language, and release status.
 */
export function MovieSubmitFormProductionFieldset(
    {className, disableFields, hideFields}: FormFieldsetProps<MovieFormStarterValues>
): ReactElement {
    const {control} = useFormContext();
    const {isPending} = useBaseFormContext();

    const field = createFormFieldConfig({disableFields, hideFields, extraDisabled: isPending})
    const fields: ConditionalRenderConfig[] = [
        field({
            key: "country",
            element: <HookFormSelect name="country" label="Country" options={ISO3166Alpha2CountryOptions}/>
        }),
        field({
            key: "runtime",
            element: <HookFormInput name="runtime" label="Duration (Min)" control={control} type="number"/>
        }),
        field({
            key: "originalLanguage",
            element: <HookFormMultiSelect
                name="originalLanguage"
                label="Original Language"
                options={ISO6391LanguageOptions}
            />
        }),
        field({
            key: "isReleased",
            element: <HookFormCheckbox name="isReleased" label="Is Released?"/>
        }),
        field({
            key: "releaseDate",
            element: <HookFormInput name="releaseDate" label="Release Date" control={control} type="date"/>
        }),
    ];

    return (
        <fieldset className={cn("space-y-3", className)}>
            <section>
                <h2 className="text-lg font-bold">Production & Release</h2>
                <Separator/>
            </section>

            {renderFields({fields})}
        </fieldset>
    );
}