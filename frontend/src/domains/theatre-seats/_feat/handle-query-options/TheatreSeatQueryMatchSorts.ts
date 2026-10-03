/**
 * @fileoverview Zod schema and type definitions for validating TheatreSeat query sort parameters.
 */

import { z } from "zod";
import { MongooseSortOrderSchema } from "@noovies-tickets/common";

/**
 * Zod schema for TheatreSeat-specific sort options.
 */
export const TheatreSeatQuerySortsSchema = z.object({
    sortByTheatre: MongooseSortOrderSchema.optional(),
    sortByScreen: MongooseSortOrderSchema.optional(),
    sortByRow: MongooseSortOrderSchema.optional(),
    sortBySeatNumber: MongooseSortOrderSchema.optional(),
    sortBySeatType: MongooseSortOrderSchema.optional(),
    sortByIsAvailable: MongooseSortOrderSchema.optional(),
    sortByPriceMultiplier: MongooseSortOrderSchema.optional(),
});

/**
 * TypeScript type inferred from {@link TheatreSeatQuerySortsSchema}.
 */
export type TheatreSeatQuerySorts = z.infer<typeof TheatreSeatQuerySortsSchema>;
