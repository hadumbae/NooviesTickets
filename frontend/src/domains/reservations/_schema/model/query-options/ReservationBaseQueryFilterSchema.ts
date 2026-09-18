/**
 * @fileoverview Zod schema and type definition for base reservation query filters.
 */

import {z} from "zod";
import {
    IDStringSchema,
    preprocessOptionalField,
    ReservationStatusSchema,
    ReservationTypeSchema
} from "@noovies-tickets/common";

/** Zod schema for validating base reservation query filter parameters. */
export const ReservationBaseQueryFilterSchema = z.object({
    movie: preprocessOptionalField(IDStringSchema),
    user: preprocessOptionalField(IDStringSchema),
    showing: preprocessOptionalField(IDStringSchema),
    status: preprocessOptionalField(ReservationStatusSchema),
    reservationType: preprocessOptionalField(ReservationTypeSchema),
});

/** Type representing the base reservation query filter parameters. */
export type ReservationBaseQueryFilters = z.infer<typeof ReservationBaseQueryFilterSchema>;