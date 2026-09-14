/**
 * @fileoverview Query key definitions for fetching reservation data by code.
 */

import {buildQueryKey} from "@/shared/_feat";

/** Query keys for the reservation fetch-by-code operation. */
export const FetchByCodeQueryKeys = buildQueryKey(
    ["reservations", "fetch", "by-code"],
    {fetchByCode: ["unique"]}
);