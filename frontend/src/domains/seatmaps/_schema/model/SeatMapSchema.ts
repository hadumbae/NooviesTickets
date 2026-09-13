/**
 * @fileoverview Defines the schema and type for seat map records within a showing.
 */

import {z} from "zod";
import {IDStringSchema, PositiveNumberSchema} from "@noovies-tickets/common";
import {SeatMapStatusSchema} from "@noovies-tickets/common";

/** Zod schema for the reservation and pricing state of a seat within a showing. */
export const SeatMapSchema = z.object({
    _id: IDStringSchema,
    seat: IDStringSchema,
    reservation: IDStringSchema.nullable().optional(),
    showing: IDStringSchema,
    basePrice: PositiveNumberSchema,
    priceMultiplier: PositiveNumberSchema,
    overridePrice: PositiveNumberSchema.optional(),
    status: SeatMapStatusSchema,
});

/** Type definition for a SeatMap record. */
export type SeatMap = z.infer<typeof SeatMapSchema>;