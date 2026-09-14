/**
 * @fileoverview Zod schema and type definitions for validating Seat query filter parameters.
 */

import { z } from "zod";
import {IDStringSchema, NonEmptyStringSchema, PositiveNumberSchema} from "@noovies-tickets/common";
import {URLParamBooleanSchema} from "@/shared/_schemas/boolean";
import { SeatTypeSchema, SeatLayoutTypeSchema } from "@noovies-tickets/common";


/**
 * Zod schema for Seat-specific query filters used to build database match conditions.
 */
export const SeatQueryFiltersSchema = z.object({
    _id: IDStringSchema.optional(),
    row: NonEmptyStringSchema.optional(),
    seatNumber: NonEmptyStringSchema.optional(),
    seatType: SeatTypeSchema.optional(),
    layoutType: SeatLayoutTypeSchema.optional(),
    isAvailable: URLParamBooleanSchema,
    priceMultiplier: PositiveNumberSchema.optional(),
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