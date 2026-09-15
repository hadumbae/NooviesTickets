/**
 * @fileoverview Zod schema and type definitions for validating seat map input data.
 */

import {z} from "zod";
import {PositiveNumberSchema, SeatMapStatusSchema} from "@noovies-tickets/common";
import {ObjectIdSchema} from "@/shared/_schema/mongoose/ObjectIdSchema";

/** Zod schema for validating the input required to create or update a seat map entry. */
export const SeatMapInputSchema = z.object({
    seat: ObjectIdSchema,
    showing: ObjectIdSchema,
    basePrice: PositiveNumberSchema,
    priceMultiplier: PositiveNumberSchema,
    overridePrice: PositiveNumberSchema.optional(),
    status: SeatMapStatusSchema,
});

/** Type definition inferred from SeatMapInputSchema. */
export type SeatMapInput = z.infer<typeof SeatMapInputSchema>;
