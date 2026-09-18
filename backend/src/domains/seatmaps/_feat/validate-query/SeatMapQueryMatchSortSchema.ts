/**
 * @fileoverview Validation schema for sorting SeatMap entities in database queries.
 * Normalizes user-facing sort parameters for seat availability and pricing lookups.
 */

import {z} from "zod";
import {MongooseSortOrderSchema, preprocessOptionalField} from "@noovies-tickets/common";

/**
 * Zod schema defining sort criteria for SeatMap queries.
 */
export const SeatMapQueryMatchSortSchema = z.object({
    sortByPrice: preprocessOptionalField(MongooseSortOrderSchema),
    sortByStatus: preprocessOptionalField(MongooseSortOrderSchema),
});

/**
 * TypeScript type inferred from SeatMapQueryMatchSortSchema.
 * Provides type safety when constructing the `$sort` stage for seating chart aggregations.
 */
export type SeatMapQueryMatchSorts = z.infer<typeof SeatMapQueryMatchSortSchema>;