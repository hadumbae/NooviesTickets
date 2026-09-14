/**
 * @fileoverview Zod schema for validating user moderation log query filters.
 */

import {z} from "zod";
import {preprocessEmptyToUndefined, UserModerationLogActionSchema} from "@noovies-tickets/common";
import {ObjectIdSchema} from "@/shared/_schema/mongoose/ObjectIdSchema";

/** Schema for filtering user moderation logs by user ID and action type. */
export const UserModerationLogQueryFilterSchema = z.object({
    user: ObjectIdSchema.optional(),
    action: preprocessEmptyToUndefined(UserModerationLogActionSchema.optional()).optional(),
});

/** Type definition for user query filters inferred from the schema. */
export type UserModerationLogQueryFilters = z.infer<typeof UserModerationLogQueryFilterSchema>;
