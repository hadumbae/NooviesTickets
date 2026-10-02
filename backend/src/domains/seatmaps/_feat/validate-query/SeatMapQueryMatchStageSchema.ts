/**
 * @fileoverview Zod schema for transforming seat map query match parameters into a Mongoose match stage.
 */

import {z} from "zod";
import {SeatMapQueryMatchFilterSchema} from "@/domains/seatmaps/_feat/validate-query/SeatMapQueryMatchFilterSchema";
import {normaliseQueryMatchValues} from "@/shared/_feat/pipeline-schema-transformers";

/** Zod schema that transforms seat map query match values into a Mongoose match pipeline stage. */
export const SeatMapQueryMatchStageSchema = SeatMapQueryMatchFilterSchema.transform(normaliseQueryMatchValues);

/** Inferred type representing the validated and transformed Mongoose match stage for seat maps. */
export type SeatMapQueryMatchStage = z.infer<typeof SeatMapQueryMatchStageSchema>;
