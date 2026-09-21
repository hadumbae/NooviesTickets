/**
 * @fileoverview Query key factory definitions for movie admin view data fetching and caching.
 */

import {buildQueryKey} from "@/shared/_feat/handle-query/buildQueryKeys.ts";

/** Standardized query keys for movie admin view data operations. */
export const MovieAdminViewDataQueryKeys = buildQueryKey(
    ["movies", "views", "admin"],
    {showings: ["showings"]},
);