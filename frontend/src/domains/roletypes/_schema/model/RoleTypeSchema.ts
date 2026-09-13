/**
 * @fileoverview Defines the Zod schemas and TypeScript types for cast and crew role entities.
 */

import {z} from "zod";
import {IDStringSchema, RoleTypeCastCategorySchema, RoleTypeCrewCategorySchema, RoleTypeDepartmentSchema} from "@noovies-tickets/common";
import {RoleTypeNameSchema} from "@/domains/roletypes/_schema/fields/RoleTypeNameSchema";
import {RoleTypeDescriptionSchema} from "@/domains/roletypes/_schema/fields/RoleTypeDescriptionSchema";

const RoleTypeBaseSchema = z.object({
    _id: IDStringSchema.readonly(),
    roleName: RoleTypeNameSchema,
    department: RoleTypeDepartmentSchema,
    description: RoleTypeDescriptionSchema,
});

const RoleTypeCrewSchema = RoleTypeBaseSchema.extend({
    department: z.literal("CREW"),
    category: RoleTypeCrewCategorySchema,
});

const RoleTypeCastSchema = RoleTypeBaseSchema.extend({
    department: z.literal("CAST"),
    category: RoleTypeCastCategorySchema,
});

/** Zod schema for validating cast and crew role types using a discriminated union on the department field. */
export const RoleTypeSchema = z.discriminatedUnion(
    "department",
    [RoleTypeCastSchema, RoleTypeCrewSchema],
);

/** Represents the inferred type for a cast or crew role entity. */
export type RoleType = z.infer<typeof RoleTypeSchema>;