/**
 * @fileoverview Validation schema for sorting Seat entities in database queries.
 * Integrates flexible sort order parsing for UI-driven data tables.
 */

import {z} from "zod";
import {MongooseSortOrderSchema, preprocessOptionalField} from "@noovies-tickets/common";

/**
 * Zod schema defining sort criteria for Seat queries.
 */
export const SeatQueryMatchSortsSchema = z.object({
    sortByTheatre: preprocessOptionalField(MongooseSortOrderSchema),
    sortByScreen: preprocessOptionalField(MongooseSortOrderSchema),
    sortByRow: preprocessOptionalField(MongooseSortOrderSchema),
    sortBySeatNumber: preprocessOptionalField(MongooseSortOrderSchema),
    sortBySeatLabel: preprocessOptionalField(MongooseSortOrderSchema),
    sortBySeatType: preprocessOptionalField(MongooseSortOrderSchema),
    sortByIsAvailable: preprocessOptionalField(MongooseSortOrderSchema),
    sortByPriceMultiplier: preprocessOptionalField(MongooseSortOrderSchema),
});

/**
 * TypeScript type inferred from SeatQueryMatchSortsSchema.
 */
export type SeatQueryMatchSorts = z.infer<typeof SeatQueryMatchSortsSchema>;