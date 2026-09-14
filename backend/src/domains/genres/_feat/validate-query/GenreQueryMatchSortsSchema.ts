/**
 * @fileoverview Zod schema and inferred type for genre sorting option parameters.
 */

import {z} from "zod";
import {MongooseNumericSortOrderSchema} from "@noovies-tickets/common";

/** Schema for validating sort key parameters for genre queries. */
export const GenreQueryMatchSortsSchema = z.object({
    sortByName: MongooseNumericSortOrderSchema.optional(),
});

/** Inferred type for genre query sort options. */
export type GenreQueryMatchSorts = z.infer<typeof GenreQueryMatchSortsSchema>;
