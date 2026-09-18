/**
 * @fileoverview Zod schema and type definitions for validating SeatMap request query options.
 */

import {z} from "zod";
import {SeatMapQueryMatchFilterSchema} from "@/domains/seatmaps/_feat/validate-query/SeatMapQueryMatchFilterSchema";
import {SeatMapQueryMatchSortSchema} from "@/domains/seatmaps/_feat/validate-query/SeatMapQueryMatchSortSchema";

/** Schema for validating and merging SeatMap query filter and sort options. */
export const SeatMapRequestQuerySchema = SeatMapQueryMatchFilterSchema.merge(SeatMapQueryMatchSortSchema);

/** Inferred TypeScript type for SeatMap request query options. */
export type SeatMapRequestQuery = z.infer<typeof SeatMapRequestQuerySchema>;