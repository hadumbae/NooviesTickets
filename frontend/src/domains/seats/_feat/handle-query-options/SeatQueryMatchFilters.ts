/**
 * @fileoverview Zod schema and type definitions for validating Seat query filter parameters.
 */

import { z } from "zod";
import {IDStringSchema, NonEmptyStringSchema, PositiveNumberSchema} from "@noovies-tickets/common";
import { SeatTypeSchema } from "@/domains/seats/_schema/fields";
import { SeatLayoutTypeSchema } from "@/domains/seats/_schema/fields";
import { CoercedBooleanValueSchema } from "@/common/_schemas/boolean/CoercedBooleanValueSchema.ts";


/**
 * Zod schema for Seat-specific query filters used to build database match conditions.
 */
export const SeatQueryFiltersSchema = z.object({
    _id: IDStringSchema.optional(),
    row: NonEmptyStringSchema.optional(),
    seatNumber: NonEmptyStringSchema.optional(),
    seatType: SeatTypeSchema.optional(),
    layoutType: SeatLayoutTypeSchema.optional(),
    isAvailable: CoercedBooleanValueSchema.optional(),
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