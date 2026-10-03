/**
 * @fileoverview Zod schema and type definitions for validating TheatreSeat query filter parameters.
 */

import { z } from "zod";
import {
    IDStringSchema,
    NonEmptyStringSchema, NonNegativeNumberSchema,
    PositiveNumberSchema,
    preprocessOptionalField, preprocessToNumber, TheatreSeatRowSchema
} from "@noovies-tickets/common";
import {URLParamBooleanSchema} from "@/shared/_schemas/boolean";
import { TheatreSeatTypeSchema, TheatreSeatLayoutTypeSchema } from "@noovies-tickets/common";


/**
 * Zod schema for TheatreSeat-specific query filters used to build database match conditions.
 */
export const TheatreSeatQueryFiltersSchema = z.object({
    _id: preprocessOptionalField(IDStringSchema),
    row: preprocessOptionalField(TheatreSeatRowSchema),
    seatNumber: preprocessToNumber(PositiveNumberSchema.optional()).optional(),
    seatType: preprocessOptionalField(TheatreSeatTypeSchema),
    layoutType: preprocessOptionalField(TheatreSeatLayoutTypeSchema),
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
 * TypeScript type inferred from {@link TheatreSeatQueryFiltersSchema}.
 */
export type TheatreSeatQueryFilters = z.infer<typeof TheatreSeatQueryFiltersSchema>;
