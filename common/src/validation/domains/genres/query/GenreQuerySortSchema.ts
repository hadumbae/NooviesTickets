/**
 * @fileoverview Zod schema and type definitions for Genre sorting options.
 */

import {z} from "zod";
import {MongooseNumericSortOrderSchema} from "../../../schema/mongoose/MongooseNumericSortOrderSchema";
import {preprocessEmptyToUndefined} from "../../../preprocessors/preprocessEmptyToUndefined";

/** Zod schema for validating genre query sorting parameters. */
export const GenreQuerySortSchema = z.object({
    sortByName: preprocessEmptyToUndefined(MongooseNumericSortOrderSchema.optional()).optional(),
});

/** Sorting parameters for genre queries. */
export type GenreQuerySorts = z.infer<typeof GenreQuerySortSchema>;
