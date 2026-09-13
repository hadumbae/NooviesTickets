/**
 * @fileoverview Validation schemas and types for user moderation log forms.
 */

import {z} from "zod";
import {ModerationLogMessageSchema, preprocessEmptyToUndefined, UserModerationLogActionSchema} from "@noovies-tickets/common";
import {AnyValues} from "@/common/_types";

/** Zod schema validating form input data for recording a user moderation log entry. */
export const UserModerationLogFormSchema = z.object({
    action: preprocessEmptyToUndefined(UserModerationLogActionSchema),
    message: preprocessEmptyToUndefined(ModerationLogMessageSchema),
});

/** TypeScript type inferred from the UserModerationLogFormSchema. */
export type UserModerationLogFormData = z.infer<typeof UserModerationLogFormSchema>;

/** TypeScript type representing relaxed or partial form input values derived from the data schema. */
export type UserModerationLogFormValues = AnyValues<UserModerationLogFormData>;