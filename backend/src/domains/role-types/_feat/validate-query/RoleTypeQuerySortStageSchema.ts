/**
 * @fileoverview Zod schema for transforming role type query sort parameters into a Mongoose sort stage.
 */

import {z} from "zod";
import {RoleTypeQuerySortSchema} from "@noovies-tickets/common";
import {normaliseQuerySortValues} from "@/shared/_feat/pipeline-schema-transformers";

/** Zod schema that transforms role type query sort values into a Mongoose sort pipeline stage. */
export const RoleTypeQuerySortStageSchema = RoleTypeQuerySortSchema.transform(normaliseQuerySortValues);

/** Inferred type representing the validated and transformed Mongoose sort stage for role types. */
export type RoleTypeQuerySortStage = z.infer<typeof RoleTypeQuerySortStageSchema>;