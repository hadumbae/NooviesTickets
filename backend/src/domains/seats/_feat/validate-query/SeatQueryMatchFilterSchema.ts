/**
 * @fileoverview Validation schema for direct attribute filtering of Seat entities.
 * These filters target properties persisted directly on the Seat document.
 */

import {z} from "zod";
import {ObjectIdSchema} from "@/shared/_schema/mongoose/ObjectIdSchema";
import {
    BooleanValueSchema,
    NonNegativeNumberSchema,
    PositiveNumberSchema,
    preprocessToBoolean,
    preprocessToNumber,
    SeatLayoutTypeSchema,
    SeatTypeSchema
} from "@noovies-tickets/common";
import {URLParamRegexPatternSchema} from "@/shared/_feat/parse-query-string";

/**
 * Zod schema defining match-level filters for Seat queries.
 */
export const SeatQueryMatchFiltersSchema = z.object({
    _id: ObjectIdSchema.optional(),
    row: URLParamRegexPatternSchema,
    seatNumber: preprocessToNumber(PositiveNumberSchema.optional()).optional(),
    seatLabel: URLParamRegexPatternSchema,
    seatType: SeatTypeSchema.optional(),
    layoutType: SeatLayoutTypeSchema.optional(),
    isAvailable: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
    theatre: ObjectIdSchema.optional(),
    screen: ObjectIdSchema.optional(),
    priceMultiplier: preprocessToNumber(NonNegativeNumberSchema.optional()).optional(),
});

/**
 * TypeScript type inferred from SeatQueryMatchFiltersSchema.
 */
export type SeatQueryMatchFilters = z.infer<typeof SeatQueryMatchFiltersSchema>;
