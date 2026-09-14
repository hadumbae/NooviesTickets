/**
 * @fileoverview Validation schema for direct attribute filtering of Showing entities.
 * Targets specific showtime properties persisted on the Showing document.
 */

import {z} from "zod";
import {ObjectIdSchema} from "@/shared/_schema/mongoose/ObjectIdSchema";
import {
    BooleanValueSchema,
    PositiveNumberSchema,
    preprocessToBoolean,
    preprocessToNumber,
    ShowingStatusSchema
} from "@noovies-tickets/common";

/**
 * Zod schema defining match-level filters for Showing queries.
 */
export const ShowingQueryMatchFilterSchema = z.object({
    movie: ObjectIdSchema.optional(),
    theatre: ObjectIdSchema.optional(),
    screen: ObjectIdSchema.optional(),
    ticketPrice: preprocessToNumber(PositiveNumberSchema.optional()).optional(),
    isSpecialEvent: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
    isActive: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
    status: ShowingStatusSchema.optional(),
});

/**
 * TypeScript type inferred from ShowingQueryMatchFilterSchema.
 */
export type ShowingQueryMatchFilters = z.infer<typeof ShowingQueryMatchFilterSchema>;
