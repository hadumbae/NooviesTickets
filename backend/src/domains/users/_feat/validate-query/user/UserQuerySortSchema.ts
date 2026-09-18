/**
 * @fileoverview Zod schema for validating user-related query string sorting parameters.
 */

import {z} from "zod";
import {MongooseSortOrderSchema, preprocessOptionalField} from "@noovies-tickets/common";

/** Zod schema defining the allowed sort fields and orders for user queries. */
export const UserQuerySortSchema = z.object({
    sortByName: preprocessOptionalField(MongooseSortOrderSchema),
    sortByEmail: preprocessOptionalField(MongooseSortOrderSchema),
    sortByUniqueCode: preprocessOptionalField(MongooseSortOrderSchema),
});

/** Type definition for user query sorting parameters inferred from UserQuerySortSchema. */
export type UserQuerySorts = z.infer<typeof UserQuerySortSchema>;