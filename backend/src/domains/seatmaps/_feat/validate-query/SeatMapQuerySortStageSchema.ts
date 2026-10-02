/**
 * @fileoverview Zod schema for transforming seat map query sort parameters into a Mongoose sort stage.
 */

import {z} from "zod";
import {SeatMapQueryMatchSortSchema} from "@/domains/seatmaps/_feat/validate-query/SeatMapQueryMatchSortSchema";
import {normaliseQuerySortValues} from "@/shared/_feat/pipeline-schema-transformers";

/** Zod schema that transforms seat map query sort values into a Mongoose sort pipeline stage. */
export const SeatMapQuerySortStageSchema = SeatMapQueryMatchSortSchema.transform(normaliseQuerySortValues);

/** Inferred type representing the validated and transformed Mongoose sort stage for seat maps. */
export type SeatMapQuerySortStage = z.infer<typeof SeatMapQuerySortStageSchema>;
