/**
 * @fileoverview Validation schemas for theatre seat layout structures.
 */

import {z} from "zod";
import {SeatLabelSchema, SeatRowSchema, SeatLayoutTypeSchema, SeatTypeSchema} from "../fields";
import {BaseModelDTOSchema} from "../../../schema/model/BaseModelDTOSchema";
import {IDStringSchema} from "../../../schema/additional-strings/id-strings/IDStringSchema";
import {SlugStringSchema} from "../../../schema/additional-strings/slug-strings/SlugString";
import {PositiveNumberSchema} from "../../../schema/numbers/PositiveNumberSchema";
import {NonNegativeNumberSchema} from "../../../schema/numbers/NonNegativeNumberSchema";
import {BooleanValueSchema} from "../../../schema/booleans/BooleanValueSchema";
import {preprocessEmptyToUndefined} from "../../../preprocessors/preprocessEmptyToUndefined";

/** Base layout entry shared across all structure types. */
export const SeatBaseSchema = BaseModelDTOSchema.extend({
    row: SeatRowSchema,
    x: PositiveNumberSchema,
    y: PositiveNumberSchema,
    layoutType: SeatLayoutTypeSchema,
    slug: SlugStringSchema.readonly(),
});

/** Theatre and screen ownership reference. */
const SeatReferenceSchema = SeatBaseSchema.extend({
    theatre: IDStringSchema,
    screen: IDStringSchema,
});

/** Bookable seating structure. */
export const SeatingStructureSchema = SeatReferenceSchema.extend({
    layoutType: z.literal("SEAT"),
    seatNumber: PositiveNumberSchema,
    seatLabel: SeatLabelSchema.optional(),
    seatType: SeatTypeSchema,
    isAvailable: BooleanValueSchema,
    priceMultiplier: preprocessEmptyToUndefined(NonNegativeNumberSchema),
});

/** Aisle layout structure. */
export const AisleStructureSchema = SeatReferenceSchema.extend({
    layoutType: z.literal("AISLE"),
});

/** Stair layout structure. */
export const StairStructureSchema = SeatReferenceSchema.extend({
    layoutType: z.literal("STAIR"),
});

/** Layout entry discriminated by layoutType. */
export const SeatSchema = z.discriminatedUnion(
    "layoutType",
    [SeatingStructureSchema, AisleStructureSchema, StairStructureSchema],
);

/** TypeScript type representing a seat in a theatre layout. */
export type Seat = z.infer<typeof SeatSchema>;
