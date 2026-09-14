/**
 * @fileoverview Query keys for the administrative person detail view.
 */

import {buildQueryKey} from "@/shared/_feat";

/**
 * Standardized query keys for administrative view data.
 */
export const PersonAdminViewQueryKeys = buildQueryKey(
    ["movie_credits", "views", "admin"],
    {details: ["person", "details"]},
);