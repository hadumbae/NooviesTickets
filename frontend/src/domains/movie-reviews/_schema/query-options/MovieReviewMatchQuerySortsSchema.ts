/**
 * @file Query sort schema for movie review matching.
 * MovieReviewMatchSortsSchema.ts
 */

import {z} from "zod";
import {MongooseSortOrderSchema, preprocessOptionalField} from "@noovies-tickets/common";

/**
 * Sort criteria for movie review queries.
 */
export const MovieReviewMatchQuerySortsSchema = z.object({
    sortByRating: preprocessOptionalField(MongooseSortOrderSchema),
});

/**
 * Inferred type for movie review query sorts.
 */
export type MovieReviewMatchQuerySorts = z.infer<typeof MovieReviewMatchQuerySortsSchema>;