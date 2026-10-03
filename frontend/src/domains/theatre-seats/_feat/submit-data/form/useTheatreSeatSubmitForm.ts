/**
 * @fileoverview Custom hook for managing the seat submission form state and validation.
 */

import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {TheatreSeat} from "@noovies-tickets/common";
import {TheatreSeatFormData, TheatreSeatFormSchema, TheatreSeatFormValues} from "@/domains/theatre-seats/_feat/submit-data/schema";
import {useTheatreSeatSubmitFormDefaultValues} from "@/domains/theatre-seats/_feat/submit-data/form/useTheatreSeatSubmitFormDefaultValues.ts";
import {FormValuesConfig} from "@/shared/_feat/submit-data";

/**
 * Initializes a React Hook Form instance for seat data with Zod schema validation.
 */
export function useTheatreSeatSubmitForm(
    params: FormValuesConfig<TheatreSeatFormValues, TheatreSeat> = {}
): UseFormReturn<TheatreSeatFormValues, unknown, TheatreSeatFormData> {
    const defaultValues: TheatreSeatFormValues = useTheatreSeatSubmitFormDefaultValues(params);

    return useForm<TheatreSeatFormValues, unknown, TheatreSeatFormData>({
        resolver: zodResolver(TheatreSeatFormSchema),
        defaultValues,
    });
}
