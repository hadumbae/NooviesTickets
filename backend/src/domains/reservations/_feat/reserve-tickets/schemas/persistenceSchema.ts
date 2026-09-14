/**
 * @fileoverview Zod schema for validating reservation persistence and lifecycle metadata.
 */

import {z} from "zod";
import {NonEmptyStringSchema, DateInstanceSchema, NonNegativeNumberSchema} from "@noovies-tickets/common";
import {ReserveTicketInputSchema} from "@/domains/reservations/_feat/reserve-tickets/schemas";
import {ObjectIdSchema} from "@/shared/_schema/mongoose/ObjectIdSchema";
import {ReservationStatusSchema} from "@noovies-tickets/common";

/** Validation schema for the internal persistence layer of a ticket reservation. */
export const ReserveTicketPersistenceSchema =
    ReserveTicketInputSchema.and(
        z.object({
            user: ObjectIdSchema,
            expiresAt: DateInstanceSchema,
            dateReserved: DateInstanceSchema,
            pricePaid: NonNegativeNumberSchema,
            status: ReservationStatusSchema,
            notes: NonEmptyStringSchema
                .max(3000, "Must be 3000 characters or less.")
                .optional(),
        })
    );

/** TypeScript type inferred from ReserveTicketPersistenceSchema. */
export type ReserveTicketPersistenceData =
    z.infer<typeof ReserveTicketPersistenceSchema>;