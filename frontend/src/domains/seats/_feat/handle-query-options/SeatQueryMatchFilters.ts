/**
 * @fileoverview Zod schema and type definitions for validating Seat query filter parameters.
 */

import { z } from "zod";
import {
    IDStringSchema,
    NonEmptyStringSchema, NonNegativeNumberSchema,
    PositiveNumberSchema,
    preprocessOptionalField, preprocessToNumber, SeatRowSchema
} from "@noovies-tickets/common";
import {URLParamBooleanSchema} from "@/shared/_schemas/boolean";
import { SeatTypeSchema, SeatLayoutTypeSchema } from "@noovies-tickets/common";


/**
 * Zod schema for Seat-specific query filters used to build database match conditions.
 */
export const SeatQueryFiltersSchema = z.object({
    _id: preprocessOptionalField(IDStringSchema),
    row: preprocessOptionalField(SeatRowSchema),
    seatNumber: preprocessToNumber(PositiveNumberSchema.optional()).optional(),
    seatType: preprocessOptionalField(SeatTypeSchema),
    layoutType: preprocessOptionalField(SeatLayoutTypeSchema),
    isAvailable: URLParamBooleanSchema,
    priceMultiplier: preprocessToNumber(NonNegativeNumberSchema.optional()).optional(),
    theatre: IDStringSchema.optional(),
    theatreSlug: NonEmptyStringSchema.optional(),
    screen: IDStringSchema.optional(),
    screenSlug: NonEmptyStringSchema.optional(),
    showing: IDStringSchema.optional(),
    showingSlug: NonEmptyStringSchema.optional(),
});

/**
 * TypeScript type inferred from {@link SeatQueryFiltersSchema}.
 */
export type SeatQueryFilters = z.infer<typeof SeatQueryFiltersSchema>;