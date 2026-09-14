/**
 * @fileoverview Validation schema for sorting Screen entities in database queries.
 */

import {z} from "zod";
import {MongooseNumericSortOrderSchema} from "@noovies-tickets/common";

/**
 * Zod schema for defining sort criteria in Screen queries.
 */
export const ScreenQueryMatchSortSchema = z.object({
    sortByName: MongooseNumericSortOrderSchema.optional(),
    sortByCapacity: MongooseNumericSortOrderSchema.optional(),
    sortByScreenType: MongooseNumericSortOrderSchema.optional(),
    sortByCreatedAt: MongooseNumericSortOrderSchema.optional(),
});

/**
 * TypeScript type inferred from ScreenQueryMatchSortSchema.
 */
export type ScreenQueryMatchSorts = z.infer<typeof ScreenQueryMatchSortSchema>;
