/**
 * @fileoverview Zod schema for validating user moderation log query string sorting parameters.
 */

import {z} from "zod";
import {MongooseSortOrderSchema, preprocessOptionalField} from "@noovies-tickets/common";

/** Zod schema defining the allowed sort fields and orders for user moderation log queries. */
export const UserModerationLogQuerySortSchema = z.object({
    sortByAction: preprocessOptionalField(MongooseSortOrderSchema),
    sortByModDate: preprocessOptionalField(MongooseSortOrderSchema),
});

/** Type definition for user moderation log query sorting parameters. */
export type UserModerationLogQuerySorts = z.infer<typeof UserModerationLogQuerySortSchema>;