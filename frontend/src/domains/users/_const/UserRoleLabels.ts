/**
 * @fileoverview Mapping of UserRole enum values to their display labels.
 */

import {UserRole} from "@noovies-tickets/common";

/** Human-readable labels for user roles. */
export const UserRoleLabels: Record<UserRole, string> = {
    USER: "User",
    ADMIN: "Admin",
};