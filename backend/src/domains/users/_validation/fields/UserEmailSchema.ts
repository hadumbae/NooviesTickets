/**
 * @fileoverview Zod validation schema and type definition for user email addresses.
 */

import {z} from "zod";
import {EmailStringSchema} from "@noovies-tickets/common";

/** Zod schema for validating user email strings with a maximum length constraint. */
export const UserEmailSchema = EmailStringSchema.max(255, "Max. 255 Chars");

/** Type definition for a validated user email string. */
export type UserEmailString = z.infer<typeof UserEmailSchema>;