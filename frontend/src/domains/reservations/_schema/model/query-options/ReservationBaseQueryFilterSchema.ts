/**
 * @fileoverview Zod schema and type definition for base reservation query filters.
 */

import {z} from "zod";
import {StringValueSchema} from "@noovies-tickets/common";
import {IDStringSchema, preprocessOptionalField, ReservationStatusSchema, ReservationTypeSchema} from "@noovies-tickets/common";

/** Zod schema for validating base reservation query filter parameters. */
export const ReservationBaseQueryFilterSchema = z.object({
    userID: preprocessOptionalField(IDStringSchema),
    showingID: preprocessOptionalField(IDStringSchema),
    uniqueCode: preprocessOptionalField(StringValueSchema),
    status: preprocessOptionalField(ReservationStatusSchema),
    reservationType: preprocessOptionalField(ReservationTypeSchema),
});

/** Type representing the base reservation query filter parameters. */
export type ReservationBaseQueryFilters = z.infer<typeof ReservationBaseQueryFilterSchema>;