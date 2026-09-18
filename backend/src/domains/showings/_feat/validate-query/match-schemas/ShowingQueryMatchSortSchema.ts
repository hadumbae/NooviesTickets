/**
 * @fileoverview Validation schema for sorting Showing entities in database queries.
 * Normalizes user-facing sort parameters for showtime scheduling and chronological ordering.
 */

import {z} from "zod";
import {MongooseSortOrderSchema, preprocessOptionalField} from "@noovies-tickets/common";

/**
 * Zod schema defining sort criteria for Showing queries.
 */
export const ShowingQueryMatchSortSchema = z.object({
    sortByStartTime: preprocessOptionalField(MongooseSortOrderSchema),
    sortByEndTime: preprocessOptionalField(MongooseSortOrderSchema),
});

/**
 * TypeScript type inferred from ShowingQueryMatchSortSchema.
 */
export type ShowingQueryMatchSorts = z.infer<typeof ShowingQueryMatchSortSchema>;