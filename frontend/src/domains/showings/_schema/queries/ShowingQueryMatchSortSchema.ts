/**
 * @fileoverview Zod schema and TypeScript type for Showing match sort criteria.
 */

import {z} from "zod";
import {MongooseSortOrderSchema, preprocessOptionalField} from "@noovies-tickets/common";

/** Zod schema for validating sort criteria for Showing query fields. */
export const ShowingQueryMatchSortSchema = z.object({
    sortByStartTime: preprocessOptionalField(MongooseSortOrderSchema),
    sortByEndTime: preprocessOptionalField(MongooseSortOrderSchema),
});

/** Sort criteria for querying Showings. */
export type ShowingQueryMatchSorts = z.infer<typeof ShowingQueryMatchSortSchema>;