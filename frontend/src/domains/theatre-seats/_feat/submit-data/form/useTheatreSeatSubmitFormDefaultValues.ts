/**
 * @fileoverview Hook for merging and stabilising default form values for seat creation and editing.
 */

import {useRef} from "react";
import {isEqual} from "lodash";
import {TheatreSeatFormValues} from "@/domains/theatre-seats/_feat/submit-data/schema/TheatreSeatFormSchema.ts";
import {FormValuesConfig} from "@/shared/_feat/submit-data";
import {TheatreSeat} from "@noovies-tickets/common";

/**
 * Computes a stable default values object by merging baseline defaults, existing seat data, and manual presets.
 */
export function useTheatreSeatSubmitFormDefaultValues(
    {presetValues, editEntity}: FormValuesConfig<TheatreSeatFormValues, TheatreSeat> = {}
): TheatreSeatFormValues {
    const defaultValues: TheatreSeatFormValues = {
        layoutType: "SEAT",
        row: "",
        x: 1,
        y: 1,
        theatre: undefined,
        screen: undefined,
        seatNumber: 1,
        seatLabel: "",
        seatType: "REGULAR",
        isAvailable: true,
        priceMultiplier: 1,
        ...editEntity,
        ...presetValues,
    };

    const heldValues = useRef<TheatreSeatFormValues>(defaultValues);

    if (!isEqual(heldValues.current, defaultValues)) {
        heldValues.current = defaultValues;
    }

    return heldValues.current;
}
