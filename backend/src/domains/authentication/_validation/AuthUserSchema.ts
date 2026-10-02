/**
 * @fileoverview Zod schema and TypeScript type definition for authenticated user entities.
 */

import {z} from "zod";
import {generateArraySchema} from "@noovies-tickets/common";
import {UserUniqueCodeSchema} from "@/domains/users/_feat/manage-user-unique-code";
import {ObjectIdSchema} from "@/shared/_schema/mongoose/ObjectIdSchema";
import {
    UserEmailSchema,
    UserPersonalNameSchema,
} from "@/domains/users/_validation/fields";
import {UserRoleSchema, UserStatusSchema} from "@noovies-tickets/common";

/** Zod validation schema for authenticated user objects. */
export const AuthUserSchema = z.object({
    _id: ObjectIdSchema,
    name: UserPersonalNameSchema,
    email: UserEmailSchema,
    uniqueCode: UserUniqueCodeSchema,
    status: UserStatusSchema,
    roles: z
        .array(UserRoleSchema, {required_error: "Required", invalid_type_error: "Must be an array of user roles."})
        .min(1, "Must have at least one role.")
        .refine((values) => values.includes("USER"), "Must include the 'USER' role."),
}, {
    required_error: "Required",
    invalid_type_error: "Must be a valid auth user object.",
});

/** Represents an authenticated user entity derived from AuthUserSchema. */
export type AuthUser = z.infer<typeof AuthUserSchema>;