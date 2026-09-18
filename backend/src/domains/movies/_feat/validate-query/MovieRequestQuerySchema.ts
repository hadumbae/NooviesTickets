/**
 * @fileoverview Combined validation schema and type for Movie query options.
 */

import {z} from "zod";
import {MovieQuerySortSchema} from "@noovies-tickets/common";
import {MovieRequestQueryFiltersSchema} from "@/domains/movies/_feat/validate-query/MovieRequestQueryFiltersSchema";

/**
 * Composite Zod schema for Movie query options.
 */
export const MovieRequestQuerySchema = MovieQuerySortSchema.merge(MovieRequestQueryFiltersSchema);

/**
 * TypeScript type representing the validated query options for Movie documents.
 */
export type MovieRequestQuery = z.infer<typeof MovieRequestQuerySchema>;