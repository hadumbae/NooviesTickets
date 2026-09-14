/**
 * @fileoverview Mutation keys for user CRUD operations.
 */

import {buildQueryKey} from "@/shared/_feat";

/** Mutation keys for user management actions like deletion. */
export const UserCRUDMutationKeys = buildQueryKey(
    ["users", "crud"],
    {destroy: ["destroy"]},
);