/**
 * @fileoverview Validation schema for sorting TheatreScreen entities in database queries.
 */

import {z} from "zod";
import {MongooseSortOrderSchema, preprocessOptionalField} from "@noovies-tickets/common";

/**
 * Zod schema for defining sort criteria in TheatreScreen queries.
 */
export const TheatreScreenQueryMatchSortSchema = z.object({
    sortByName: preprocessOptionalField(MongooseSortOrderSchema),
    sortByCapacity: preprocessOptionalField(MongooseSortOrderSchema),
    sortByTheatreScreenType: preprocessOptionalField(MongooseSortOrderSchema),
    sortByCreatedAt: preprocessOptionalField(MongooseSortOrderSchema),
});

/**
 * TypeScript type inferred from TheatreScreenQueryMatchSortSchema.
 */
export type TheatreScreenQueryMatchSorts = z.infer<typeof TheatreScreenQueryMatchSortSchema>;
