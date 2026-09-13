/**
 * @fileoverview Zod schema and type definition for base reservation query filters.
 */

import {z} from "zod";
import {StringValueSchema} from "@/common/_schemas";
import {IDStringSchema, preprocessOptionalField} from "@noovies-tickets/common";
import {ReservationStatusSchema, ReservationTypeEnumSchema} from "@/domains/reservations/_schema/model/fields";

/** Zod schema for validating base reservation query filter parameters. */
export const ReservationBaseQueryFilterSchema = z.object({
    userID: preprocessOptionalField(IDStringSchema),
    showingID: preprocessOptionalField(IDStringSchema),
    uniqueCode: preprocessOptionalField(StringValueSchema),
    status: preprocessOptionalField(ReservationStatusSchema),
    reservationType: preprocessOptionalField(ReservationTypeEnumSchema),
});

/** Type representing the base reservation query filter parameters. */
export type ReservationBaseQueryFilters = z.infer<typeof ReservationBaseQueryFilterSchema>;