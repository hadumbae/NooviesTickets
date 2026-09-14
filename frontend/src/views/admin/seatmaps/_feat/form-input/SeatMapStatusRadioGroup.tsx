/**
 * @fileoverview A radio group component for selecting seat map status within a form.
 */

import {ReactElement} from "react";
import {FieldValues} from "react-hook-form";
import {HookFormRadioGroup} from "@/views/shared/_feat";
import {HookRadioOption} from "@/shared/_types/input/HookRadioOption.ts";
import {convertToTitleCase} from "@/shared/_feat/formatters/convertToTitleCase.ts";
import {SeatMapStatusConstant} from "@noovies-tickets/common";
import {HookFormInputProps} from "@/shared/_types/input/HookFormInputProps.ts";

/**
 * Form-integrated radio group for seat map statuses. Requires a wrapping FormProvider.
 */
export function SeatMapStatusRadioGroup<TValues extends FieldValues>(
    props: Omit<HookFormInputProps<TValues>, "control">
): ReactElement {
    const items: HookRadioOption[] = SeatMapStatusConstant.map(
        (status): HookRadioOption => ({value: status, label: convertToTitleCase(status)}),
    );

    return (
        <HookFormRadioGroup {...props} items={items}/>
    );
}
