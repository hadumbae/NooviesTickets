/**
 * @fileoverview Defines the Zod schema and type for filtering RoleType queries.
 */

import {z} from "zod";
import {RoleTypeDepartmentSchema, preprocessOptionalField, RoleTypeNameSchema} from "@noovies-tickets/common";

/** Zod schema for validating RoleType query filter parameters. */
export const RoleTypeQueryFiltersSchema = z.object({
    department: preprocessOptionalField(RoleTypeDepartmentSchema),
    roleName: preprocessOptionalField(RoleTypeNameSchema),
});
/** Represents the optional filters that can be applied when querying RoleType records. */
export type RoleTypeQueryFilters = z.infer<typeof RoleTypeQueryFiltersSchema>;