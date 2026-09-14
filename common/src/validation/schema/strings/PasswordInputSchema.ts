/**
 * @fileoverview Defines the validation schema and type for submitted password input,
 * such as at login. Deliberately does not enforce the password creation policy
 * (see {@link PasswordStringSchema}) — only that a non-empty, reasonably bounded
 * string was submitted. A stricter check here would leak the password policy to
 * unauthenticated callers and could lock out existing users if the policy changes
 * after their password was created.
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "./NonEmptyStringSchema";

/** Zod schema for validating submitted password input without revealing password policy constraints. */
export const PasswordInputSchema = NonEmptyStringSchema.max(1024, "Max. 1024 Chars");

/** Type definition for validated password input. */
export type PasswordInput = z.infer<typeof PasswordInputSchema>;
