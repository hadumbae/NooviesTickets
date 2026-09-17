/**
 * @fileoverview Zod schemas for validating genre query parameters including filtering and sorting options.
 */

import {z} from "zod";
import {GenreQueryFilterSchema} from "./GenreQueryFilterSchema";
import {GenreQuerySortSchema} from "./GenreQuerySortSchema";

/** Combined schema including both filter and sorting options for genre queries. */
export const GenreQueryOptionsSchema = GenreQueryFilterSchema.merge(GenreQuerySortSchema);

/** Combined type representing all valid query parameters for genres. */
export type GenreQueryOptions = z.infer<typeof GenreQueryOptionsSchema>;
