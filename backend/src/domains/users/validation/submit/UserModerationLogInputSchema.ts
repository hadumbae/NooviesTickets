/**
 * @fileoverview Validation schemas and types for user moderation log entry inputs.
 */

import {z} from "zod";
import {ModerationLogMessageSchema, UserModerationLogActionSchema} from "@noovies-tickets/common";

/** Zod schema validating the input object data required to log a user moderation action. */
export const UserModerationLogInputSchema = z.object({
    action: UserModerationLogActionSchema,
    message: ModerationLogMessageSchema,
});

/** TypeScript type inferred from the UserModerationLogInputSchema. */
export type UserModerationLogInput = z.infer<typeof UserModerationLogInputSchema>;