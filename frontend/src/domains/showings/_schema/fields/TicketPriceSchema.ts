/**
 * @fileoverview Zod schema and type definition for ticket price validation with empty string preprocessing.
 */

import {preprocessEmptyToUndefined, NonNegativeNumberSchema} from "@noovies-tickets/common";
import {z} from "zod";

/**
 * Zod schema for validating ticket price, transforming empty strings to undefined.
 */
export const TicketPriceSchema = preprocessEmptyToUndefined(
    NonNegativeNumberSchema,
);

/**
 * Inferred type for ticket price.
 */
export type TicketPrice = z.infer<typeof TicketPriceSchema>;