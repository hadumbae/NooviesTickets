/**
 * @fileoverview Hook Form select component for choosing seat types using predefined constants and labels.
 */

import {ReactElement} from "react";
import {FieldValues} from "react-hook-form";
import {HookFormSelect} from "@/views/shared/_comp/form-select/HookFormSelect.tsx";
import {HookFormInputControlProps} from "@/shared/_types/input/HookFormInputProps.ts";
import {TheatreSeatTypeLabelMap} from "@/domains/theatre-seats";
import {TheatreSeatTypeConstant} from "@noovies-tickets/common";

/**
 * Renders a selection input for seat types with labels mapped from TheatreSeatTypeLabelMap.
 */
export function TheatreSeatTypeHookFormSelect<TSubmit extends FieldValues>(
    props: Omit<HookFormInputControlProps<TSubmit>, "control">
): ReactElement {
    const options = TheatreSeatTypeConstant.map(type => ({
        value: type,
        label: TheatreSeatTypeLabelMap[type],
    }));

    return (
        <HookFormSelect options={options} {...props} />
    );
}
