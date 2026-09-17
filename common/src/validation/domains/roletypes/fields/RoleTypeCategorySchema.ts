/**
 * @fileoverview Zod enum schemas for role type categories.
 */

import {z} from "zod";
import {RoleTypeCastCategoryConstant} from "./RoleTypeCastCategoryConstant";
import {RoleTypeCrewCategoryConstant} from "./RoleTypeCrewCategoryConstant";
import {ZodEnumParamHandler} from "../../../schema/enums/handler/ZodEnumParamHandler";

/** Enum schema for cast role categories. */
export const RoleTypeCastCategorySchema = z.enum(RoleTypeCastCategoryConstant, ZodEnumParamHandler({
    invalidValue: "Invalid Value.",
    invalidType: "Must be a valid string.",
}));

/** Cast role category type. */
export type RoleTypeCastCategory = z.infer<typeof RoleTypeCastCategorySchema>;

/** Enum schema for crew role categories. */
export const RoleTypeCrewCategorySchema = z.enum(RoleTypeCrewCategoryConstant, ZodEnumParamHandler({
    invalidValue: "Invalid Value.",
    invalidType: "Must be a valid string.",
}));

/** Crew role category type. */
export type RoleTypeCrewCategory = z.infer<typeof RoleTypeCrewCategorySchema>;

/** Enum schema for all role type categories. */
export const RoleTypeCategorySchema = z.enum(
    [...RoleTypeCastCategoryConstant, ...RoleTypeCrewCategoryConstant],
    ZodEnumParamHandler({
        invalidValue: "Invalid Value.",
        invalidType: "Must be a valid string.",
    }),
);

/** Role category type (cast or crew). */
export type RoleTypeCategory = z.infer<typeof RoleTypeCategorySchema>;
