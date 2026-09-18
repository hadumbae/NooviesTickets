/**
 * @fileoverview Transformation logic for MovieCredit query options.
 * Consolidates complex credit filters and sort orders into a structured
 * Mongoose aggregation pipeline configuration.
 */

import {z} from "zod";
import {MovieCreditQueryMatchFiltersSchema} from "@/domains/movie-credits/_feat/validate-query/filters";
import {MovieCreditQueryMatchSortsSchema} from "@/domains/movie-credits/_feat/validate-query/sorting";

/**
 * Composite Zod schema for MovieCredit query options with an aggregation transformation.
 */
export const MovieCreditRequestQuerySchema = MovieCreditQueryMatchFiltersSchema.merge(MovieCreditQueryMatchSortsSchema);

/**
 * TypeScript type inferred from the transformed MovieCreditRequestQuerySchema.
 */
export type MovieCreditRequestQuery = z.infer<typeof MovieCreditRequestQuerySchema>;