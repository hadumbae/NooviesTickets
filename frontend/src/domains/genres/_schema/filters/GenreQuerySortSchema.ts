/**
 * @fileoverview Zod schema and type definitions for Genre sorting options.
 */

import {z} from "zod";
import {MongooseNumericSortOrderSchema, preprocessEmptyToUndefined} from "@noovies-tickets/common";

/**
 * Zod schema for validating genre query sorting parameters.
 */
export const GenreQuerySortSchema = z.object({
    sortByName: preprocessEmptyToUndefined(MongooseNumericSortOrderSchema.optional()).optional(),
});

/** Sorting parameters for genre queries. */
export type GenreQuerySorts = z.infer<typeof GenreQuerySortSchema>;