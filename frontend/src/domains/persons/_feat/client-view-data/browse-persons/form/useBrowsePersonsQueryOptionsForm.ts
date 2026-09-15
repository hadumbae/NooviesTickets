/**
 * @fileoverview Hook for initialising and managing the browse persons query options form state.
 */

import {
    useBrowsePersonsQueryOptionsFormDefaultValues
} from "@/domains/persons/_feat/client-view-data/browse-persons/form/useBrowsePersonsQueryOptionsFormDefaultValues.ts";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    BrowsePersonsQueryOptions,
    BrowsePersonsQueryOptionsSchema
} from "@/domains/persons/_feat/validate-query-options";
import {
    BrowsePersonsQueryOptionsFormValues
} from "@/domains/persons/_feat/client-view-data/browse-persons/form/BrowsePersonsQueryOptionsFormValues.ts";

/** Configuration options for the browse persons form hook. */
type FormConfig = {
    queryValues?: BrowsePersonsQueryOptions;
    presetValues?: Partial<BrowsePersonsQueryOptionsFormValues>;
}

/** Initialises a React Hook Form instance for person browsing filters with Zod validation. */
export function useBrowsePersonsQueryOptionsForm(
    {queryValues, presetValues}: FormConfig
): UseFormReturn<BrowsePersonsQueryOptionsFormValues, unknown, BrowsePersonsQueryOptions> {
    const defaultValues = useBrowsePersonsQueryOptionsFormDefaultValues({queryValues, presetValues});

    return useForm<BrowsePersonsQueryOptionsFormValues, unknown, BrowsePersonsQueryOptions>({
        resolver: zodResolver(BrowsePersonsQueryOptionsSchema),
        defaultValues
    });
}