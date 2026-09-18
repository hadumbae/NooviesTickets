/**
 * @fileoverview Validation schema and types for RoleType query filtering.
 */

import {z} from "zod";
import {RoleTypeQueryFilterSchema} from "@noovies-tickets/common";
import {URLParamRegexPatternSchema} from "@/shared/_feat/parse-query-string";

/**
 * Validates filtering criteria for RoleType queries.
 * Extends the shared base filter schema with Mongoose-specific transforms.
 */
export const RoleTypeRequestQueryFiltersSchema = RoleTypeQueryFilterSchema
    .omit({roleName: true})
    .extend({
        roleName: URLParamRegexPatternSchema,
    });

/**
 * Type representing validated filters for RoleType document queries.
 */
export type RoleTypeRequestQueryFilters = z.infer<typeof RoleTypeRequestQueryFiltersSchema>;
