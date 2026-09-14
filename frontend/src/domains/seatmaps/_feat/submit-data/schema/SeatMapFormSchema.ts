/**
 * @fileoverview Zod schemas for validating and shaping SeatMap form data.
 */

import {z} from "zod";
import {AnyValues} from "@/shared/_types";
import {IDStringSchema, preprocessToNumber, PositiveNumberSchema} from "@noovies-tickets/common";
import {SeatMapStatusSchema} from "@noovies-tickets/common";

/**
 * Base schema for validating raw SeatMap form input including seat, showing, pricing, and status.
 */
export const SeatMapFormSchema = z.object({
    _id: IDStringSchema.optional().readonly(),
    seat: IDStringSchema,
    showing: IDStringSchema,
    basePrice: preprocessToNumber(PositiveNumberSchema),
    priceMultiplier: preprocessToNumber(PositiveNumberSchema),
    overridePrice: preprocessToNumber(PositiveNumberSchema.optional()).optional(),
    status: SeatMapStatusSchema,
});

/** Fully validated seat map form data. */
export type SeatMapFormData = z.infer<typeof SeatMapFormSchema>;

/** Form-layer seat map values supporting intermediate or partial input states. */
export type SeatMapFormValues = AnyValues<SeatMapFormData>;