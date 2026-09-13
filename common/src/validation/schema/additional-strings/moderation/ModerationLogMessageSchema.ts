/**
 * @fileoverview Zod schema and type definition for moderation log messages.
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "../../strings/NonEmptyStringSchema";

/** Zod schema for validating a moderation log message string. */
export const ModerationLogMessageSchema = NonEmptyStringSchema.max(500, "Max. 500 Chars");

/** Type inferred from the ModerationLogMessageSchema. */
export type ModerationLogMessage = z.infer<typeof ModerationLogMessageSchema>;