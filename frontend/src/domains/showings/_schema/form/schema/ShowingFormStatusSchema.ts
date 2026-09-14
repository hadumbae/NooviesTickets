/**
 * @fileoverview Zod schema for validating showing status, pricing, and configuration flags.
 */

import {z} from "zod";
import {ShowingStatusSchema, preprocessToNumber, PositiveNumberSchema} from "@noovies-tickets/common";
import {URLParamBooleanSchema} from "@/shared/_schemas/boolean";


/**
 * Schema for showing pricing, lifecycle state, and configuration flags.
 */
export const ShowingFormStatusSchema = z.object({
    ticketPrice: preprocessToNumber(PositiveNumberSchema),
    status: ShowingStatusSchema,
    config: z.object({
        isActive: URLParamBooleanSchema,
        isSpecialEvent: URLParamBooleanSchema,
        canReserveSeats: URLParamBooleanSchema,
    }),
});

/**
 * Inferred type for showing status and configuration form values.
 */
export type ShowingFormStatuses = z.infer<typeof ShowingFormStatusSchema>;