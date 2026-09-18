/**
 * @fileoverview Defines the schema for validating and transforming movie query sort stages.
 */

import {z} from "zod";
import {MovieQuerySortSchema} from "@noovies-tickets/common";
import {normaliseQuerySortValues} from "@/shared/_feat/pipeline-schema-transformers";

/** Zod schema that validates and normalises movie sort parameters. */
export const MovieQuerySortStageSchema = MovieQuerySortSchema.transform(normaliseQuerySortValues);

/** Type definition for the validated movie query sort stage. */
export type MovieQuerySortStage = z.infer<typeof MovieQuerySortStageSchema>;