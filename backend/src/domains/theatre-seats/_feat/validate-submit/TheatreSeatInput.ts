/**
 * @fileoverview Zod validation schemas for theatre seating layouts.
 * Supports different layout types including seats, aisles, and stairs.
 */

import { z } from 'zod';
import {BooleanValueSchema, NonEmptyStringSchema, PositiveNumberSchema, NonNegativeNumberSchema, TheatreSeatLayoutTypeSchema} from "@noovies-tickets/common";
import { ObjectIdStringSchema } from "@/shared/_schema/mongoose/ObjectIdStringSchema";
import {TheatreSeatTypeSchema} from "@noovies-tickets/common";

/**
 * Common properties shared across all grid elements in a theatre screen layout.
 */
export const TheatreSeatInputBaseSchema = z.object({
    theatre: ObjectIdStringSchema,
    screen: ObjectIdStringSchema,
    row: NonEmptyStringSchema.max(10, "Must be 10 characters or less."),
    x: PositiveNumberSchema,
    y: PositiveNumberSchema,
    layoutType: TheatreSeatLayoutTypeSchema,
});

/**
 * Validation for layout grid elements designated as walkway aisles.
 */
export const TheatreSeatInputAisleSchema = TheatreSeatInputBaseSchema.extend({
    layoutType: z.literal("AISLE"),
});

/**
 * Validation for layout grid elements designated as stairs.
 */
export const TheatreSeatInputStairSchema = TheatreSeatInputBaseSchema.extend({
    layoutType: z.literal("STAIR"),
});

/**
 * Validation for functional seats, including pricing and availability data.
 */
export const TheatreSeatInputSeatingSchema = TheatreSeatInputBaseSchema.extend({
    layoutType: z.literal("SEAT"),
    seatType: TheatreSeatTypeSchema,
    seatNumber: NonNegativeNumberSchema,
    seatLabel: NonEmptyStringSchema.max(50, "Must be 50 characters or less").optional(),
    isAvailable: BooleanValueSchema,
    priceMultiplier: NonNegativeNumberSchema,
});

/**
 * Discriminated union schema that routes validation logic based on the `layoutType` field.
 */
export const TheatreSeatInputSchema = z.discriminatedUnion("layoutType", [
    TheatreSeatInputAisleSchema,
    TheatreSeatInputStairSchema,
    TheatreSeatInputSeatingSchema,
]);

/**
 * Type definition for seat and layout input data, inferred from the union schema.
 */
export type TheatreSeatInputData = z.infer<typeof TheatreSeatInputSchema>;
