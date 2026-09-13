/**
 * @fileoverview Defines the Zod schema and TypeScript type for user roles.
 */

import {z} from "zod";
import {UserRoleConstant} from "./UserRoleConstant";
import {ZodEnumParamHandler} from "../../schema/enums/handler/ZodEnumParamHandler";

/** Zod schema for validating user roles against predefined constants. */
export const UserRoleSchema = z.enum(UserRoleConstant, ZodEnumParamHandler({
    invalidValue: "Must be a valid user role.",
    invalidType: "Must be a valid user role string.",
}));

/** Type representing a valid user role string. */
export type UserRole = z.infer<typeof UserRoleSchema>;
