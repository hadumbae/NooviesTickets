/**
 * @fileoverview Zod schema and type for filtering RoleType queries.
 */

import {z} from "zod";
import {RoleTypeDepartmentSchema} from "../fields/RoleTypeDepartmentSchema";
import {TrimmedStringSchema} from "../../../schema/strings/TrimmedStringSchema";
import {preprocessOptionalField} from "../../../preprocessors/preprocessOptionalField";

/** Zod schema for validating RoleType query filter parameters. */
export const RoleTypeQueryFilterSchema = z.object({
    roleName: preprocessOptionalField(TrimmedStringSchema),
    department: preprocessOptionalField(RoleTypeDepartmentSchema),
});

/** Represents the optional filters that can be applied when querying RoleType records. */
export type RoleTypeQueryFilters = z.infer<typeof RoleTypeQueryFilterSchema>;
