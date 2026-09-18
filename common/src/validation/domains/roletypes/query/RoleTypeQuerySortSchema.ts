/**
 * @fileoverview Zod schema and type definitions for sorting RoleType query results.
 */

import {z} from "zod";
import {MongooseSortOrderSchema} from "../../../schema/mongoose/MongooseSortOrderSchema";
import {preprocessOptionalField} from "../../../preprocessors/preprocessOptionalField";

/** Zod schema for validating RoleType sorting parameters. */
export const RoleTypeQuerySortSchema = z.object({
    sortByRoleName: preprocessOptionalField(MongooseSortOrderSchema),
    sortByDepartment: preprocessOptionalField(MongooseSortOrderSchema),
});

/** Type definition for RoleType query sorting options. */
export type RoleTypeQuerySorts = z.infer<typeof RoleTypeQuerySortSchema>;
