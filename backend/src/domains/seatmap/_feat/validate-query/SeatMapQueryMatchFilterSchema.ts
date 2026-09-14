/**
 * @fileoverview Validation schema for direct attribute filtering of SeatMap entities.
 * These filters target the real-time state of a specific seat for a specific showing.
 */

import {z} from "zod";
import {ObjectIdSchema} from "@/shared/_schema/mongoose/ObjectIdSchema";
import {PositiveNumberSchema, preprocessToNumber, SeatMapStatusSchema} from "@noovies-tickets/common";

/**
 * Zod schema defining match-level filters for SeatMap queries.
 */
export const SeatMapQueryMatchFilterSchema = z.object({
    showing: ObjectIdSchema.optional(),
    seat: ObjectIdSchema.optional(),
    price: preprocessToNumber(PositiveNumberSchema.optional()).optional(),
    status: SeatMapStatusSchema.optional(),
});

/**
 * TypeScript type inferred from SeatMapQueryMatchFilterSchema.
 */
export type SeatMapQueryMatchFilters = z.infer<typeof SeatMapQueryMatchFilterSchema>;
