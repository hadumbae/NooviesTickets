/**
 * @fileoverview Validation schema for sorting Theatre entities in database queries.
 * Normalizes UI-driven sort parameters into Mongoose-compatible order values.
 */

import {z} from "zod";
import {MongooseSortOrderSchema, preprocessOptionalField} from "@noovies-tickets/common";

/**
 * Zod schema defining sort criteria for Theatre queries.
 */
export const TheatreQueryMatchSortSchema = z.object({
    sortByName: preprocessOptionalField(MongooseSortOrderSchema),
    sortBySeatCapacity: preprocessOptionalField(MongooseSortOrderSchema),
    sortByCity: preprocessOptionalField(MongooseSortOrderSchema),
    sortByState: preprocessOptionalField(MongooseSortOrderSchema),
    sortByCountry: preprocessOptionalField(MongooseSortOrderSchema),
    sortByPostalCode: preprocessOptionalField(MongooseSortOrderSchema),
    sortByTimezone: preprocessOptionalField(MongooseSortOrderSchema),
});

/**
 * TypeScript type inferred from TheatreQueryMatchSortSchema.
 */
export type TheatreQueryMatchSorts = z.infer<typeof TheatreQueryMatchSortSchema>;