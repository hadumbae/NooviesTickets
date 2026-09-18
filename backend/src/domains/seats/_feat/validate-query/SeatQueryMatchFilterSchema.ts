/**
 * @fileoverview Validation schema for direct attribute filtering of Seat entities.
 * These filters target properties persisted directly on the Seat document.
 */

import {z} from "zod";
import {ObjectIdSchema} from "@/shared/_schema/mongoose/ObjectIdSchema";
import {
    BooleanValueSchema,
    NonNegativeNumberSchema,
    PositiveNumberSchema, preprocessOptionalField,
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
    _id: preprocessOptionalField(ObjectIdSchema),
    row: URLParamRegexPatternSchema,
    seatNumber: preprocessToNumber(PositiveNumberSchema.optional()).optional(),
    seatLabel: URLParamRegexPatternSchema,
    seatType: preprocessOptionalField(SeatTypeSchema),
    layoutType: preprocessOptionalField(SeatLayoutTypeSchema),
    isAvailable: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
    priceMultiplier: preprocessToNumber(NonNegativeNumberSchema.optional()).optional(),
    theatre: preprocessOptionalField(ObjectIdSchema),
    theatreSlug: preprocessOptionalField(ObjectIdSchema),
    screen: preprocessOptionalField(ObjectIdSchema),
    screenSlug: preprocessOptionalField(ObjectIdSchema),
    showing: preprocessOptionalField(ObjectIdSchema),
    showingSlug: preprocessOptionalField(ObjectIdSchema),
});

/**
 * TypeScript type inferred from SeatQueryMatchFiltersSchema.
 */
export type SeatQueryMatchFilters = z.infer<typeof SeatQueryMatchFiltersSchema>;
