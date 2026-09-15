/**
 * @fileoverview Defines the combined schema for user moderation log query filters and sorting options.
 */

import {z} from "zod";
import {
    UserModerationLogQueryFilterSchema
} from "@/domains/users/_feat/validate-query/moderation-log/UserModerationLogQueryFilterSchema";
import {
    UserModerationLogQuerySortSchema
} from "@/domains/users/_feat/validate-query/moderation-log/UserModerationLogQuerySortSchema";

/** Zod schema merging moderation log filters and sort parameters. */
export const UserModerationLogRequestQuerySchema = UserModerationLogQueryFilterSchema.merge(UserModerationLogQuerySortSchema);

/** Type definition for the combined user moderation log query options. */
export type UserModerationLogRequestQuery = z.infer<typeof UserModerationLogRequestQuerySchema>;
