/**
 * @fileoverview Validation schema for direct attribute filtering of TheatreSeat entities.
 * These filters target properties persisted directly on the TheatreSeat document.
 */

import {z} from "zod";
import {ObjectIdSchema} from "@/shared/_schema/mongoose/ObjectIdSchema";
import {
    BooleanValueSchema,
    NonNegativeNumberSchema,
    PositiveNumberSchema, preprocessOptionalField,
    preprocessToBoolean,
    preprocessToNumber,
    TheatreSeatLayoutTypeSchema,
    TheatreSeatTypeSchema
} from "@noovies-tickets/common";
import {URLParamRegexPatternSchema} from "@/shared/_feat/parse-query-string";

/**
 * Zod schema defining match-level filters for TheatreSeat queries.
 */
export const TheatreSeatQueryMatchFiltersSchema = z.object({
    _id: preprocessOptionalField(ObjectIdSchema),
    row: URLParamRegexPatternSchema,
    seatNumber: preprocessToNumber(PositiveNumberSchema.optional()).optional(),
    seatLabel: URLParamRegexPatternSchema,
    seatType: preprocessOptionalField(TheatreSeatTypeSchema),
    layoutType: preprocessOptionalField(TheatreSeatLayoutTypeSchema),
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
 * TypeScript type inferred from TheatreSeatQueryMatchFiltersSchema.
 */
export type TheatreSeatQueryMatchFilters = z.infer<typeof TheatreSeatQueryMatchFiltersSchema>;
