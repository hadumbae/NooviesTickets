/**
 * @fileoverview Zod schema and type definitions for role type departments.
 */

import {z} from "zod";
import {RoleTypeDepartmentConstant} from "./RoleTypeDepartmentConstant";
import {ZodEnumParamHandler} from "../../../schema/enums/handler/ZodEnumParamHandler";

/** Zod schema for validating role type department strings. */
export const RoleTypeDepartmentSchema = z.enum(RoleTypeDepartmentConstant, ZodEnumParamHandler({
    invalidValue: "Must be `CAST` or `CREW`.",
    invalidType: "Must be a valid `Department` string.",
}));

/** Union type of valid role type departments. */
export type RoleTypeDepartment = z.infer<typeof RoleTypeDepartmentSchema>;
