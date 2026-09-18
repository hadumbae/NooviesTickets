/**
 * @fileoverview Validation schema for direct attribute filtering of SeatMap entities.
 * These filters target the real-time state of a specific seat for a specific showing.
 */

import {z} from "zod";
import {ObjectIdSchema} from "@/shared/_schema/mongoose/ObjectIdSchema";
import {
    PositiveNumberSchema,
    preprocessOptionalField,
    preprocessToNumber,
    SeatMapStatusSchema
} from "@noovies-tickets/common";

/**
 * Zod schema defining match-level filters for SeatMap queries.
 */
export const SeatMapQueryMatchFilterSchema = z.object({
    // showing: preprocessOptionalField(IDStringSchema),
    showing: preprocessOptionalField(ObjectIdSchema),
    // seat: preprocessOptionalField(IDStringSchema),
    seat: preprocessOptionalField(ObjectIdSchema),
    status: preprocessOptionalField(SeatMapStatusSchema),
    price: preprocessToNumber(PositiveNumberSchema.optional()).optional(),
});

/**
 * TypeScript type inferred from SeatMapQueryMatchFilterSchema.
 */
export type SeatMapQueryMatchFilters = z.infer<typeof SeatMapQueryMatchFilterSchema>;
