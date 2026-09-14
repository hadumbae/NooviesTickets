/**
 * @fileoverview React Query key definitions for theatre search operations.
 */

import {buildQueryKey} from "@/shared/_feat";

/**
 * Query key definitions for the theatre search feature.
 */
export const SearchTheatreQueryKeys = buildQueryKey(
    ["theatres", "feat", "search"],
    {byLocation: ["by-location"]}
);