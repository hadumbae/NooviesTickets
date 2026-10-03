/**
 * @fileoverview Build query keys for seat-related mutation operations used by React Query.
 */

import {buildQueryKey} from "@/shared/_feat";

/**
 * Unique identifiers for seat mutations, including submission and single entity deletion.
 */
export const TheatreSeatCRUDMutationKeys = buildQueryKey(
    ["theatre-seats", "mutations"],
    {submit: ["submit"], deleteSingle: ["delete", "single"]}
);
