/**
 * @fileoverview Zod schema and type for combined movie query filtering and sorting options.
 */

import {z} from "zod";
import {MovieQueryFilterSchema} from "./MovieQueryFilterSchema";
import {MovieQuerySortSchema} from "./MovieQuerySortSchema";

/** Zod schema merging movie filter and sort parameters for query validation. */
export const MovieQueryOptionsSchema = MovieQueryFilterSchema.merge(MovieQuerySortSchema);

/** Type representing combined movie query filters and sorting. */
export type MovieQueryOptions = z.infer<typeof MovieQueryOptionsSchema>;
