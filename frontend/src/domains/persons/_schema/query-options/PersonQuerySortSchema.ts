/**
 * @fileoverview Zod schemas and types for sorting Person query results.
 */

import {z} from "zod";
import {MongooseSortOrderSchema, preprocessOptionalField} from "@noovies-tickets/common";

/** Zod schema for defining sort order on Person fields. */
export const PersonQuerySortSchema = z.object({
    sortByName: preprocessOptionalField(MongooseSortOrderSchema),
    sortByDOB: preprocessOptionalField(MongooseSortOrderSchema),
    sortByNationality: preprocessOptionalField(MongooseSortOrderSchema),
});

/** Type for Person query sorting options. */
export type PersonQuerySorts = z.infer<typeof PersonQuerySortSchema>;