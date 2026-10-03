/**
 * @fileoverview Validation schema for sorting TheatreSeat entities in database queries.
 * Integrates flexible sort order parsing for UI-driven data tables.
 */

import {z} from "zod";
import {MongooseSortOrderSchema, preprocessOptionalField} from "@noovies-tickets/common";

/**
 * Zod schema defining sort criteria for TheatreSeat queries.
 */
export const TheatreSeatQueryMatchSortsSchema = z.object({
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
 * TypeScript type inferred from TheatreSeatQueryMatchSortsSchema.
 */
export type TheatreSeatQueryMatchSorts = z.infer<typeof TheatreSeatQueryMatchSortsSchema>;
