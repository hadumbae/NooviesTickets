/**
 * @fileoverview Defines the validation schema and type for user registration input data.
 */

import {z} from "zod";
import {NonEmptyStringSchema, EmailStringSchema, PasswordStringSchema} from "@noovies-tickets/common";

/** Zod schema for validating user registration requests, including password confirmation matching. */
export const UserRegisterInputSchema = z.object({
    name: NonEmptyStringSchema.min(3, "Min. 3 Chars").max(255, "Max. 255 Chars"),
    email: EmailStringSchema.max(255, "Max. 255 Chars"),
    password: PasswordStringSchema,
    confirm: PasswordStringSchema,
}).refine(
    (data) => data.password === data.confirm, {message: "Passwords do not match", path: ['confirm']}
);

/** Type inferred from the UserRegisterInputSchema. */
export type UserRegisterInput = z.infer<typeof UserRegisterInputSchema>;
