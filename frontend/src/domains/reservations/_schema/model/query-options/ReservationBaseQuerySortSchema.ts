/**
 * @fileoverview Zod schema for defining sort options in reservation base queries.
 */

import {z} from "zod";
import {MongooseSortOrderSchema, preprocessOptionalField} from "@noovies-tickets/common";

/** Zod schema for reservation sorting parameters. */
export const ReservationBaseQuerySortSchema = z.object({
    sortByStatus: preprocessOptionalField(MongooseSortOrderSchema),
    sortByDateReserved: preprocessOptionalField(MongooseSortOrderSchema),
    sortByDatePaid: preprocessOptionalField(MongooseSortOrderSchema),
    sortByDateCancelled: preprocessOptionalField(MongooseSortOrderSchema),
    sortByDateRefunded: preprocessOptionalField(MongooseSortOrderSchema),
    sortByDateExpired: preprocessOptionalField(MongooseSortOrderSchema),
});

/** Type definition for reservation sorting options. */
export type ReservationBaseQuerySorts = z.infer<typeof ReservationBaseQuerySortSchema>;