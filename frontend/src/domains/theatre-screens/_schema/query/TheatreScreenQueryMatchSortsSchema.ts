/**
 * @fileoverview Zod schema and type definitions for sorting Theatre Screen query results.
 * Standardizes how MongoDB sort parameters are passed for screen-related lists.
 */

import {z} from "zod";
import {MongooseSortOrderSchema, preprocessOptionalField} from "@noovies-tickets/common";

/**
 * Zod schema for validating theatre screen sort configurations.
 */
export const TheatreScreenQueryMatchSortsSchema = z.object({
    sortByName: preprocessOptionalField(MongooseSortOrderSchema),
    sortByCapacity: preprocessOptionalField(MongooseSortOrderSchema),
    sortByScreenType: preprocessOptionalField(MongooseSortOrderSchema),
    sortByCreatedAt: preprocessOptionalField(MongooseSortOrderSchema),
});

/**
 * TypeScript type for Theatre Screen query sorting.
 */
export type TheatreScreenQuerySorts = z.infer<typeof TheatreScreenQueryMatchSortsSchema>;