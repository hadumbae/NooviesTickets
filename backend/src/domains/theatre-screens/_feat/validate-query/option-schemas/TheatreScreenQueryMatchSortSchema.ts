/**
 * @fileoverview Validation schema for sorting TheatreScreen entities in database queries.
 */

import {z} from "zod";
import {MongooseNumericSortOrderSchema} from "@noovies-tickets/common";

/**
 * Zod schema for defining sort criteria in TheatreScreen queries.
 */
export const TheatreScreenQueryMatchSortSchema = z.object({
    sortByName: MongooseNumericSortOrderSchema.optional(),
    sortByCapacity: MongooseNumericSortOrderSchema.optional(),
    sortByTheatreScreenType: MongooseNumericSortOrderSchema.optional(),
    sortByCreatedAt: MongooseNumericSortOrderSchema.optional(),
});

/**
 * TypeScript type inferred from TheatreScreenQueryMatchSortSchema.
 */
export type TheatreScreenQueryMatchSorts = z.infer<typeof TheatreScreenQueryMatchSortSchema>;
