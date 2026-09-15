/**
 * @fileoverview Zod schema for transforming screen query sort parameters into a Mongoose sort stage.
 */

import {z} from "zod";
import {TheatreScreenQueryMatchSortSchema} from "@/domains/theatre-screen/_feat/validate-query/option-schemas/TheatreScreenQueryMatchSortSchema";
import {normaliseQuerySortValues} from "@/shared/_feat/pipeline-schema-transformers";

/** Zod schema that transforms screen query sort values into a Mongoose sort pipeline stage. */
export const TheatreScreenQuerySortStageSchema = TheatreScreenQueryMatchSortSchema.transform(normaliseQuerySortValues);

/** Inferred type representing the validated and transformed Mongoose sort stage for screens. */
export type TheatreScreenQuerySortStage = z.infer<typeof TheatreScreenQuerySortStageSchema>;