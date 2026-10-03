/**
 * @fileoverview Zod schema for transforming seat query match parameters into a Mongoose match stage.
 */

import {z} from "zod";
import {TheatreSeatQueryMatchFiltersSchema} from "@/domains/theatre-seats/_feat/validate-query/TheatreSeatQueryMatchFilterSchema";
import {normaliseQueryMatchValues} from "@/shared/_feat/pipeline-schema-transformers";

/** Zod schema that transforms seat query match values into a Mongoose match pipeline stage. */
export const TheatreSeatQueryMatchStageSchema = TheatreSeatQueryMatchFiltersSchema.transform(normaliseQueryMatchValues);

/** Inferred type representing the validated and transformed Mongoose match stage for seats. */
export type TheatreSeatQueryMatchStage = z.infer<typeof TheatreSeatQueryMatchStageSchema>;
