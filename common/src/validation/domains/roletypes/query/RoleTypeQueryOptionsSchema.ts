/**
 * @fileoverview Zod schema and type for combined RoleType query filtering and sorting options.
 */

import {z} from "zod";
import {RoleTypeQueryFilterSchema} from "./RoleTypeQueryFilterSchema";
import {RoleTypeQuerySortSchema} from "./RoleTypeQuerySortSchema";

/** Zod schema for full RoleType query options, combining filters and sort options. */
export const RoleTypeQueryOptionsSchema = RoleTypeQueryFilterSchema.merge(RoleTypeQuerySortSchema);

/** Combines both filters and sorts into a single type for querying RoleType records. */
export type RoleTypeQueryOptions = z.infer<typeof RoleTypeQueryOptionsSchema>;
