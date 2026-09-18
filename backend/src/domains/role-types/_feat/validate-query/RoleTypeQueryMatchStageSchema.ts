/**
 * @fileoverview Zod schema for transforming role type query match parameters into a Mongoose match stage.
 */

import {z} from "zod";
import {normaliseQueryMatchValues} from "@/shared/_feat/pipeline-schema-transformers";
import {RoleTypeRequestQueryFiltersSchema} from "@/domains/role-types/_feat/validate-query/RoleTypeRequestQueryFiltersSchema";

/** Zod schema that transforms role type query match values into a Mongoose match pipeline stage. */
export const RoleTypeQueryMatchStageSchema = RoleTypeRequestQueryFiltersSchema.transform(normaliseQueryMatchValues);

/** Inferred type representing the validated and transformed Mongoose match stage for role types. */
export type RoleTypeQueryMatchStage = z.infer<typeof RoleTypeQueryMatchStageSchema>;