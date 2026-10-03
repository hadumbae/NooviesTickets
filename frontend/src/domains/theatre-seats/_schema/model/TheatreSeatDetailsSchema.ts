/**
 * @fileoverview Zod schema and type definitions for fully populated seat details.
 */

import {z} from "zod";
import {
    NonEmptyStringSchema,
    BooleanValueSchema,
    NumberValueSchema,
    preprocessToNumber,
    PositiveNumberSchema,
    TheatreSeatBaseSchema,
    TheatreSeatTypeSchema,
    TheatreSchema,
    TheatreScreenSchema,
} from "@noovies-tickets/common";

/** Schema for seating positions with full theatre and screen references. */
const TheatreSeatDetailsReferenceSchema = TheatreSeatBaseSchema.extend({
    theatre: z.lazy(() => TheatreSchema),
    screen: z.lazy(() => TheatreScreenSchema),
});

/** Schema for seating positions with full theatre and screen references. */
const SeatingSchema = TheatreSeatDetailsReferenceSchema.extend({
    layoutType: z.literal("SEAT"),
    seatNumber: PositiveNumberSchema,
    seatLabel: NonEmptyStringSchema.optional(),
    seatType: TheatreSeatTypeSchema,
    isAvailable: BooleanValueSchema,
    priceMultiplier: preprocessToNumber(NumberValueSchema.gte(0, "Must be 0 or greater.")),
});

/** Schema for an aisle position within the layout. */
const AisleSchema = TheatreSeatDetailsReferenceSchema.extend({
    layoutType: z.literal("AISLE"),
});

/** Schema for a stair position within the layout. */
const StairSchema = TheatreSeatDetailsReferenceSchema.extend({
    layoutType: z.literal("STAIR"),
});

/** Discriminated union schema for fully populated seat details. */
export const TheatreSeatDetailsSchema = z.discriminatedUnion(
    "layoutType",
    [SeatingSchema, AisleSchema, StairSchema],
);

/** TypeScript type representing a seat with fully populated theatre and screen objects. */
export type TheatreSeatDetails = z.infer<typeof TheatreSeatDetailsSchema>;
