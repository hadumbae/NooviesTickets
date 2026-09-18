/**
 * @fileoverview Defines the Zod schema and type for reservation query sorting options.
 */

import {z} from "zod";
import {MongooseSortOrderSchema, preprocessOptionalField} from "@noovies-tickets/common";

/** Zod schema for reservation query sorting options. */
export const ReservationBaseQuerySortSchema = z.object({
    sortByMovie: preprocessOptionalField(MongooseSortOrderSchema),
    sortByStatus: preprocessOptionalField(MongooseSortOrderSchema),
    sortByDateReserved: preprocessOptionalField(MongooseSortOrderSchema),
    sortByDatePaid: preprocessOptionalField(MongooseSortOrderSchema),
    sortByDateCancelled: preprocessOptionalField(MongooseSortOrderSchema),
    sortByDateRefunded: preprocessOptionalField(MongooseSortOrderSchema),
    sortByDateExpired: preprocessOptionalField(MongooseSortOrderSchema),
});

/** Sort options for reservation queries. */
export type ReservationBaseQuerySorts = z.infer<typeof ReservationBaseQuerySortSchema>;