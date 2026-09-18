/**
 * @fileoverview Zod schema and type definitions for Genre sorting options.
 */

import {z} from "zod";
import {MongooseSortOrderSchema} from "../../../schema/mongoose/MongooseSortOrderSchema";
import {preprocessOptionalField} from "../../../preprocessors/preprocessOptionalField";

/** Zod schema for validating genre query sorting parameters. */
export const GenreQuerySortSchema = z.object({
    sortByName: preprocessOptionalField(MongooseSortOrderSchema),
});

/** Sorting parameters for genre queries. */
export type GenreQuerySorts = z.infer<typeof GenreQuerySortSchema>;
