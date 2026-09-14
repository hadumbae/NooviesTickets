/**
 * @fileoverview Hook Form select component for choosing seat types using predefined constants and labels.
 */

import {ReactElement} from "react";
import {FieldValues} from "react-hook-form";
import {HookFormSelect} from "@/views/shared/_comp/form-select/HookFormSelect.tsx";
import {HookFormInputControlProps} from "@/shared/_types/input/HookFormInputProps.ts";
import {SeatTypeLabelMap} from "@/domains/seats";
import {SeatTypeConstant} from "@noovies-tickets/common";

/**
 * Renders a selection input for seat types with labels mapped from SeatTypeLabelMap.
 */
export function SeatTypeHookFormSelect<TSubmit extends FieldValues>(
    props: Omit<HookFormInputControlProps<TSubmit>, "control">
): ReactElement {
    const options = SeatTypeConstant.map(type => ({
        value: type,
        label: SeatTypeLabelMap[type],
    }));

    return (
        <HookFormSelect options={options} {...props} />
    );
}