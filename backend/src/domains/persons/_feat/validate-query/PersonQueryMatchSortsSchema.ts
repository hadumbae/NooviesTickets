/**
 * @fileoverview Validation schema and types for Person query sorting.
 */

import {z} from "zod";
import {MongooseNumericSortOrderSchema} from "@noovies-tickets/common";

/**
 * Validates available sort fields for Person results.
 */
export const PersonQueryMatchSortsSchema = z.object({
    /** Sort order by name (1 for asc, -1 for desc). */
    sortByName: MongooseNumericSortOrderSchema.optional(),

    /** Sort order by date of birth. */
    sortByDOB: MongooseNumericSortOrderSchema.optional(),

    /** Sort order by nationality code. */
    sortByNationality: MongooseNumericSortOrderSchema.optional(),
});

/**
 * Type representing validated sorting options for Person document queries.
 */
export type PersonQueryMatchSorts = z.infer<typeof PersonQueryMatchSortsSchema>;
