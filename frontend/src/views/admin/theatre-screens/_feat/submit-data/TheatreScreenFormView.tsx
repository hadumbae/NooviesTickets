/**
 * @fileoverview Form view component for submitting and editing a theatre screen.
 */

import {ReactElement} from "react";
import {TheatreScreenTypeHookFormSelect} from "@/views/admin/theatre-screens/_feat/form-inputs";
import {useFormContext} from "react-hook-form";
import {TheatreHookFormSelect} from "@/views/admin/theatres/_feat/form-input/selects/TheatreHookFormSelect.tsx";
import {useBaseFormContext} from "@/shared/_feat/generic-form-context";
import {HookFormInput} from "@/views/shared/_feat";
import {TheatreScreenFormValues} from "@/domains/theatre-screens";
import {cn, FormViewProps} from "@/shared/_feat";

/**
 * Form view component for rendering the input fields of the theatre screen form.
 */
export function TheatreScreenFormView(
    {disableFields, hideFields, className}: FormViewProps<TheatreScreenFormValues>
): ReactElement {
    const {control} = useFormContext();
    const {isPending} = useBaseFormContext()

    return (
        <div className={cn("space-y-4 mb-6", className)}>
            {
                !hideFields?.theatre &&
                <TheatreHookFormSelect
                    disabled={isPending || disableFields?.theatre}
                    name="theatre"
                    label="Theatre"
                />
            }

            {
                !hideFields?.name &&
                <HookFormInput
                    name="name"
                    label="Name"
                    control={control}
                    disabled={isPending || disableFields?.name}
                />
            }

            {
                !hideFields?.capacity &&
                <HookFormInput
                    name="capacity"
                    label="Capacity"
                    disabled={isPending || disableFields?.capacity}
                    control={control}
                    type="number"
                    min={0}
                />
            }

            {
                !hideFields?.screenType &&
                <TheatreScreenTypeHookFormSelect
                    control={control}
                    disabled={isPending || disableFields?.screenType}
                    name="screenType"
                    label="Screen Type"
                />
            }
        </div>
    );
}