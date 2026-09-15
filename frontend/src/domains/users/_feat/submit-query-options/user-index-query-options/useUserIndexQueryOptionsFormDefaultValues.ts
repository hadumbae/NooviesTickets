/**
 * @fileoverview Hook for calculating and memoizing default form values for user index query options.
 */

import {useRef} from "react";
import {isEqual} from "lodash";
import {QueryOptionsFormValues} from "@/shared/_feat";
import {UserQueryOptions} from "@/domains/users/_schema/query-options";
import {UserIndexQueryOptionsFormValues} from "@/domains/users/_feat/submit-query-options/user-index-query-options/types.ts";

/** Computes the initial form state by merging preset values and existing query options. */
export function useUserIndexQueryOptionsFormDefaultValues(
    {presetValues, queryOptions}: QueryOptionsFormValues<UserIndexQueryOptionsFormValues, UserQueryOptions>
): UserIndexQueryOptionsFormValues {
    const initialValues: UserIndexQueryOptionsFormValues = {
        name: "",
        email: "",
        uniqueCode: "",
        roles: [],
        sortByName: "",
        sortByEmail: "",
        sortByUniqueCode: "",
        ...queryOptions,
        ...presetValues,
    };

    const heldValues = useRef<UserIndexQueryOptionsFormValues>(initialValues);

    if (!isEqual(heldValues.current, initialValues)) {
        heldValues.current = initialValues;
    }

    return heldValues.current;
}