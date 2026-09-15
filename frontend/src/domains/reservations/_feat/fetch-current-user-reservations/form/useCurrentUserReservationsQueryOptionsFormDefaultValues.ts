/**
 * @fileoverview Hook for generating default form values for current user reservation queries.
 */

import {
    CurrentUserReservationsQueryOptionsFormValues
} from "@/domains/reservations/_feat/fetch-current-user-reservations/form/CurrentUserReservationsQueryOptionsFormValues.ts";
import {CurrentUserReservationsQueryOptions} from "@/domains/reservations/_feat/fetch-current-user-reservations/schema";
import {parseSearchParamFormValues} from "@/shared/_feat";
import {useRef} from "react";
import {isEqual} from "lodash";
import {FormValuesConfig} from "@/shared/_feat/submit-data";

/** Computes and memoizes default form values for current user reservation queries based on search parameters and presets. */
export function useCurrentUserReservationsQueryOptionsFormDefaultValues(
    {
        editEntity,
        presetValues
    }: FormValuesConfig<CurrentUserReservationsQueryOptionsFormValues, CurrentUserReservationsQueryOptions> = {}
): CurrentUserReservationsQueryOptionsFormValues {
    const parsedOptions = editEntity ? parseSearchParamFormValues(editEntity) : {};

    const defaultValues: CurrentUserReservationsQueryOptionsFormValues = {
        status: "",
        reservationType: "",
        uniqueCode: "",
        sortByStatus: "",
        sortByDateReserved: "",
        ...parsedOptions,
        ...presetValues,
    };

    const heldValues = useRef<CurrentUserReservationsQueryOptionsFormValues>(defaultValues);

    if (!isEqual(heldValues.current, defaultValues)) {
        heldValues.current = defaultValues;
    }

    return heldValues.current;
}