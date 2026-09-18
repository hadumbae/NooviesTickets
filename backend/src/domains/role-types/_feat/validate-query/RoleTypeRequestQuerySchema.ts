/**
 * @fileoverview Combined validation schema and type for RoleType query options.
 */

import {z} from "zod";
import {RoleTypeQuerySortSchema} from "@noovies-tickets/common";
import {RoleTypeRequestQueryFiltersSchema} from "@/domains/role-types/_feat/validate-query/RoleTypeRequestQueryFiltersSchema";

/**
 * Composite Zod schema for RoleType query options.
 */
export const RoleTypeRequestQuerySchema = RoleTypeQuerySortSchema.merge(RoleTypeRequestQueryFiltersSchema);

/**
 * TypeScript type representing the validated query options for RoleType documents.
 */
export type RoleTypeRequestQuery = z.infer<typeof RoleTypeRequestQuerySchema>;
