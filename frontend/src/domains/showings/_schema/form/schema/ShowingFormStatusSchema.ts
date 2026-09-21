/**
 * @fileoverview Zod schema for validating showing status, pricing, and configuration flags.
 */

import {z} from "zod";
import {
    BooleanValueSchema,
    PositiveNumberSchema,
    preprocessEmptyToUndefined,
    preprocessToBoolean,
    preprocessToNumber,
    ShowingStatusSchema
} from "@noovies-tickets/common";

/**
 * Schema for showing pricing, lifecycle state, and configuration flags.
 */
export const ShowingFormStatusSchema = z.object({
    ticketPrice: preprocessToNumber(PositiveNumberSchema),
    status: preprocessEmptyToUndefined(ShowingStatusSchema),
    config: z.object({
        isActive: preprocessToBoolean(BooleanValueSchema),
        isSpecialEvent: preprocessToBoolean(BooleanValueSchema),
        canReserveSeats: preprocessToBoolean(BooleanValueSchema),
    }),
});

/**
 * Inferred type for showing status and configuration form values.
 */
export type ShowingFormStatuses = z.infer<typeof ShowingFormStatusSchema>;