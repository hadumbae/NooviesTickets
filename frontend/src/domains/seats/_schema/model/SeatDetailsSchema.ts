/**
 * @fileoverview Zod schema and type definitions for fully populated seat details.
 */

import {z} from "zod";
import {SeatBaseSchema} from "./SeatSchema.ts";
import {NonEmptyStringSchema} from "@noovies-tickets/common";
import {BooleanValueSchema, NumberValueSchema, preprocessToNumber, PositiveNumberSchema} from "@noovies-tickets/common";

import {SeatTypeSchema} from "@noovies-tickets/common";
import {TheatreScreenSchema} from "@/domains/theatre-screens/_schema";
import {TheatreSchema} from "@/domains/theatres/_schema/theatre/TheatreSchema.ts";

/** Schema for seating positions with full theatre and screen references. */
const SeatDetailsReferenceSchema = SeatBaseSchema.extend({
    theatre: z.lazy(() => TheatreSchema),
    screen: z.lazy(() => TheatreScreenSchema),
});

/** Schema for seating positions with full theatre and screen references. */
const SeatingSchema = SeatDetailsReferenceSchema.extend({
    layoutType: z.literal("SEAT"),
    seatNumber: PositiveNumberSchema,
    seatLabel: NonEmptyStringSchema.optional(),
    seatType: SeatTypeSchema,
    isAvailable: BooleanValueSchema,
    priceMultiplier: preprocessToNumber(NumberValueSchema.gte(0, "Must be 0 or greater.")),
});

/** Schema for an aisle position within the layout. */
const AisleSchema = SeatDetailsReferenceSchema.extend({
    layoutType: z.literal("AISLE"),
});

/** Schema for a stair position within the layout. */
const StairSchema = SeatDetailsReferenceSchema.extend({
    layoutType: z.literal("STAIR"),
});

/** Discriminated union schema for fully populated seat details. */
export const SeatDetailsSchema = z.discriminatedUnion(
    "layoutType",
    [SeatingSchema, AisleSchema, StairSchema],
);

/** TypeScript type representing a seat with fully populated theatre and screen objects. */
export type SeatDetails = z.infer<typeof SeatDetailsSchema>;