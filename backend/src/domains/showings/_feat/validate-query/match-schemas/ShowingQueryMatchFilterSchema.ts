/**
 * @fileoverview Validation schema for direct attribute filtering of Showing entities.
 * Targets specific showtime properties persisted on the Showing document.
 */

import {z} from "zod";
import {ObjectIdSchema} from "@/shared/_schema/mongoose/ObjectIdSchema";
import {
    BooleanValueSchema,
    preprocessOptionalField,
    preprocessToBoolean,
    ShowingStatusSchema
} from "@noovies-tickets/common";

/**
 * Zod schema defining match-level filters for Showing queries.
 */
export const ShowingQueryMatchFilterSchema = z.object({
    movie: preprocessOptionalField(ObjectIdSchema),
    theatre: preprocessOptionalField(ObjectIdSchema),
    screen: preprocessOptionalField(ObjectIdSchema),
    isSpecialEvent: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
    isActive: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
    status: preprocessOptionalField(ShowingStatusSchema),
});

/**
 * TypeScript type inferred from ShowingQueryMatchFilterSchema.
 */
export type ShowingQueryMatchFilters = z.infer<typeof ShowingQueryMatchFilterSchema>;
