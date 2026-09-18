/**
 * @fileoverview Zod schema for validating base reservation query filters.
 */

import {z} from "zod";
import {preprocessOptionalField, ReservationStatusSchema, ReservationTypeSchema} from "@noovies-tickets/common";
import {ObjectIdSchema} from "@/shared/_schema/mongoose/ObjectIdSchema";

/** Zod schema for validating the base query parameters of a reservation. */
export const ReservationBaseQueryFilterSchema = z.object({
    movie: preprocessOptionalField(ObjectIdSchema),
    user: preprocessOptionalField(ObjectIdSchema),
    showing: preprocessOptionalField(ObjectIdSchema),
    status: preprocessOptionalField(ReservationStatusSchema),
    reservationType: preprocessOptionalField(ReservationTypeSchema),
});

/** Type definition for the base reservation query filters inferred from the Zod schema. */
export type ReservationBaseQueryFilters = z.infer<typeof ReservationBaseQueryFilterSchema>;
