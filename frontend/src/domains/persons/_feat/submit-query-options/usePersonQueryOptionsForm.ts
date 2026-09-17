/**
 * @fileoverview Hook for managing the person query options form state and validation.
 */

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm, UseFormReturn} from "react-hook-form";
import {PersonQueryOptions, PersonQueryOptionsSchema} from "@/domains/persons/_schema";
import {PersonQueryOptionsFormValues} from "@/domains/persons/_feat/submit-query-options/schema.ts";

/** Configuration parameters for the person query option form hook. */
type FormParams = {
    presetValues?: PersonQueryOptions;
};

/** Initialises a React Hook Form instance for filtering and sorting person records. */
export function usePersonQueryOptionsForm(
    {presetValues}: FormParams = {},
): UseFormReturn<PersonQueryOptionsFormValues, unknown, PersonQueryOptions> {
    const defaultValues: PersonQueryOptionsFormValues = {
        name: "",
        dob: "",
        nationality: "",
        sortByName: "",
        sortByDob: "",
        sortByNationality: "",
        ...presetValues
    };

    return useForm<PersonQueryOptionsFormValues, unknown, PersonQueryOptions>({
        resolver: zodResolver(PersonQueryOptionsSchema),
        defaultValues,
    });
}
