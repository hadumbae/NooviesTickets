/**
 * @fileoverview Foundational Zod schema and type for Reservation entity validation.
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "@noovies-tickets/common";
import {BooleanValueSchema, IDStringSchema, MongooseTimestampsSchema, SlugStringSchema, ISO8601DateTimeSchema, NonNegativeNumberSchema, PositiveNumberSchema, ISO4217CurrencyCodeSchema, ReservationStatusSchema, ReservationTypeSchema} from "@noovies-tickets/common";
import {ReservedShowingSnapshotSchema} from "@/domains/reservations/_schema/snapshot";
import {ReservationUniqueCodeSchema} from "@/domains/reservations/_schema/model/fields";

/** Zod schema for the temporal lifecycle and deadlines of a reservation. */
const ReservationBaseDateSchema = z.object({
    dateReserved: ISO8601DateTimeSchema,
    datePaid: ISO8601DateTimeSchema.optional(),
    dateCancelled: ISO8601DateTimeSchema.optional(),
    dateRefunded: ISO8601DateTimeSchema.optional(),
    dateExpired: ISO8601DateTimeSchema.optional(),
    expiresAt: ISO8601DateTimeSchema,
});

/** Zod schema for financial and quantity data associated with a reservation. */
const ReservationBasePaymentSchema = z.object({
    ticketCount: PositiveNumberSchema,
    pricePaid: NonNegativeNumberSchema,
    currency: ISO4217CurrencyCodeSchema,
    isPaid: BooleanValueSchema,
});

/** Zod schema for relational references and immutable data snapshots. */
const ReservationBaseRelatedSchema = z.object({
    user: IDStringSchema,
    movie: IDStringSchema,
    showing: IDStringSchema,
    snapshot: ReservedShowingSnapshotSchema,
});

/** Zod schema for identification and administrative metadata. */
const ReservationBaseMetaSchema = z.object({
    _id: IDStringSchema.readonly(),
    slug: SlugStringSchema.readonly(),
    uniqueCode: ReservationUniqueCodeSchema.readonly(),
    reservationType: ReservationTypeSchema,
    status: ReservationStatusSchema,
    notes: NonEmptyStringSchema
        .max(3000, "Must be 3000 characters or less.")
        .optional()
        .nullable(),
});

/** Core validation schema defining the comprehensive structure of a Reservation record. */
export const ReservationBaseSchema = MongooseTimestampsSchema.extend({
    ...ReservationBaseDateSchema.shape,
    ...ReservationBasePaymentSchema.shape,
    ...ReservationBaseRelatedSchema.shape,
    ...ReservationBaseMetaSchema.shape,
});

/** Base interface for all reservation-related data structures. */
export type ReservationBase = z.infer<typeof ReservationBaseSchema>;