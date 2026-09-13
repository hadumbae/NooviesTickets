/**
 * @fileoverview Defines the validation schema and type for user login credentials.
 */

import {z} from "zod";
import {PasswordStringSchema} from "@/shared/schema/strings/PasswordStringSchema";
import {EmailStringSchema} from "@noovies-tickets/common";

/** Zod schema for validating user login input data. */
export const UserLoginInputSchema = z.object({
    email: EmailStringSchema.max(255, "Max. 255 Chars"),
    password: PasswordStringSchema,
});

/** Type definition for user login input derived from the Zod schema. */
export type UserLoginInput = z.infer<typeof UserLoginInputSchema>;
