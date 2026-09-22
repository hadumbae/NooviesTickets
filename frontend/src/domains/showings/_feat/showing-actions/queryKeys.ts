/**
 * @fileoverview Query keys for administrative movie showing actions.
 */

import {buildQueryKey} from "@/shared/_feat/handle-query/buildQueryKeys.ts";

/** Query keys for administrative movie showing actions. */
export const ShowingActionsQueryKeys = buildQueryKey(
    ["showings", "admin", "actions"],
    {cancel: ["cancel"]},
);