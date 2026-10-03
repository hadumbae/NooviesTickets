/**
 * @fileoverview Build query keys for seat-related data fetching operations used by React Query.
 */

import {buildQueryKey} from "@/shared/_feat";

/**
 * Unique identifiers for seat queries, including single entity lookups and various list retrieval modes.
 */
export const TheatreSeatCRUDQueryKeys = buildQueryKey(
    ["theatre-seats", "crud"],
    {
            _id: ["_id"],
            slug: ["slug"],
            list: ["list"],
            query: ["list", "query"],
            paginated: ["list", "paginated"],
            queryPaginated: ["list", "query", "paginated"],
    },
);
