/**
 * @fileoverview Hook for managing the current user's reservation query options form.
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {
    CurrentUserReservationsQueryOptions,
    CurrentUserReservationsQueryOptionsSchema
} from "@/domains/reservations/_feat/fetch-current-user-reservations/schema";
import {
    CurrentUserReservationsQueryOptionsFormValues
} from "@/domains/reservations/_feat/fetch-current-user-reservations/form/CurrentUserReservationsQueryOptionsFormValues.ts";
import {
    useCurrentUserReservationsQueryOptionsFormDefaultValues
} from "@/domains/reservations/_feat/fetch-current-user-reservations/form/useCurrentUserReservationsQueryOptionsFormDefaultValues.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormValuesConfig} from "@/shared/_feat/submit-data";

/** Initialises a React Hook Form for managing current user reservation query parameters. */
export function useCurrentUserReservationsQueryOptionsForm(
    values: FormValuesConfig<CurrentUserReservationsQueryOptionsFormValues, CurrentUserReservationsQueryOptions> = {}
): UseFormReturn<CurrentUserReservationsQueryOptionsFormValues, unknown, CurrentUserReservationsQueryOptions> {
    const defaultValues = useCurrentUserReservationsQueryOptionsFormDefaultValues(values);

    return useForm<CurrentUserReservationsQueryOptionsFormValues, unknown, CurrentUserReservationsQueryOptions>({
        resolver: zodResolver(CurrentUserReservationsQueryOptionsSchema),
        defaultValues,
    });
}