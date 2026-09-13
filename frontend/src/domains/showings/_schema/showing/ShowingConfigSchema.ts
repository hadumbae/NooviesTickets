/**
 * @fileoverview Zod schema and type definition for showing configuration flags.
 */

import {z} from "zod";
import {BooleanValueSchema} from "@noovies-tickets/common";

/**
 * Optional configuration flags for a showing.
 */
export const ShowingConfigSchema = z.object({
    isActive: BooleanValueSchema,
    canReserveSeats: BooleanValueSchema.optional(),
    isSpecialEvent: BooleanValueSchema.optional(),
});

/**
 * Inferred showing configuration type.
 */
export type ShowingConfig = z.infer<typeof ShowingConfigSchema>;