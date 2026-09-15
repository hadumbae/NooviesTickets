/**
 * @fileoverview Hook for managing and synchronising person search query form values.
 */

import {useRef} from "react";
import {isEqual} from "lodash";
import {
    BrowsePersonsQueryOptionsFormValues
} from "@/domains/persons/_feat/client-view-data/browse-persons/form/BrowsePersonsQueryOptionsFormValues.ts";
import {
    BrowsePersonsQueryOptions
} from "@/domains/persons/_feat/validate-query-options/person-browse/BrowsePersonsQueryOptionsSchema.ts";
import {parseSearchParamFormValues} from "@/shared/_feat";

/** Configuration for initialising person query form values. */
type ValueConfig = {
    queryValues?: BrowsePersonsQueryOptions;
    presetValues?: Partial<BrowsePersonsQueryOptionsFormValues>;
};

/**
 * Manages the state of person query options, ensuring values remain synchronised with provided presets.
 */
export function useBrowsePersonsQueryOptionsFormDefaultValues(
    {queryValues, presetValues}: ValueConfig
): BrowsePersonsQueryOptionsFormValues {
    const parsedOptions = queryValues ? parseSearchParamFormValues(queryValues) : {};

    const defaultValues: BrowsePersonsQueryOptionsFormValues = {
        name: "",
        sortByName: "1",
        ...parsedOptions,
        ...presetValues,
    };

    const heldValues = useRef<BrowsePersonsQueryOptionsFormValues>(defaultValues);

    if (!isEqual(heldValues.current, defaultValues)) {
        heldValues.current = defaultValues;
    }

    return heldValues.current;
}