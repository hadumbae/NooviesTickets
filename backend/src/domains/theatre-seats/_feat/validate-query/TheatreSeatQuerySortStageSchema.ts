/**
 * @fileoverview Zod schema for transforming seat query sort parameters into a Mongoose sort stage.
 */

import {z} from "zod";
import {TheatreSeatQueryMatchSortsSchema} from "@/domains/theatre-seats/_feat/validate-query/TheatreSeatQueryMatchSortsSchema";
import {normaliseQuerySortValues} from "@/shared/_feat/pipeline-schema-transformers";

/** Zod schema that transforms seat query sort values into a Mongoose sort pipeline stage. */
export const TheatreSeatQuerySortStageSchema = TheatreSeatQueryMatchSortsSchema.transform(normaliseQuerySortValues);

/** Inferred type representing the validated and transformed Mongoose sort stage for seats. */
export type TheatreSeatQuerySortStage = z.infer<typeof TheatreSeatQuerySortStageSchema>;
