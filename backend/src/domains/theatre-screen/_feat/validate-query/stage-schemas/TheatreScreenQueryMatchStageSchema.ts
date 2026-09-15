/**
 * @fileoverview Zod schema for transforming screen query match parameters into a Mongoose match stage.
 */

import {z} from "zod";
import {TheatreScreenQueryMatchFilterSchema} from "@/domains/theatre-screen/_feat/validate-query/option-schemas/TheatreScreenQueryMatchFilterSchema";
import {normaliseQueryMatchValues} from "@/shared/_feat/pipeline-schema-transformers";

/** Zod schema that transforms screen query match values into a Mongoose match pipeline stage. */
export const TheatreScreenQueryMatchStageSchema = TheatreScreenQueryMatchFilterSchema.transform(normaliseQueryMatchValues);

/** Inferred type representing the validated and transformed Mongoose match stage for screens. */
export type TheatreScreenQueryMatchStage = z.infer<typeof TheatreScreenQueryMatchStageSchema>;