/**
 * @fileoverview Validation schemas for theatre seat layout structures.
 */

import {z} from "zod";
import {TheatreSeatLabelSchema, TheatreSeatRowSchema, TheatreSeatLayoutTypeSchema, TheatreSeatTypeSchema} from "../fields";
import {BaseModelDTOSchema} from "../../../schema/model/BaseModelDTOSchema";
import {IDStringSchema} from "../../../schema/additional-strings/id-strings/IDStringSchema";
import {SlugStringSchema} from "../../../schema/additional-strings/slug-strings/SlugString";
import {PositiveNumberSchema} from "../../../schema/numbers/PositiveNumberSchema";
import {NonNegativeNumberSchema} from "../../../schema/numbers/NonNegativeNumberSchema";
import {BooleanValueSchema} from "../../../schema/booleans/BooleanValueSchema";
import {preprocessEmptyToUndefined} from "../../../preprocessors/preprocessEmptyToUndefined";

/** Base layout entry shared across all structure types. */
export const TheatreSeatBaseSchema = BaseModelDTOSchema.extend({
    row: TheatreSeatRowSchema,
    x: PositiveNumberSchema,
    y: PositiveNumberSchema,
    layoutType: TheatreSeatLayoutTypeSchema,
    slug: SlugStringSchema.readonly(),
});

/** Theatre and screen ownership reference. */
const TheatreSeatReferenceSchema = TheatreSeatBaseSchema.extend({
    theatre: IDStringSchema,
    screen: IDStringSchema,
});

/** Bookable seating structure. */
export const SeatingStructureSchema = TheatreSeatReferenceSchema.extend({
    layoutType: z.literal("SEAT"),
    seatNumber: PositiveNumberSchema,
    seatLabel: TheatreSeatLabelSchema.optional(),
    seatType: TheatreSeatTypeSchema,
    isAvailable: BooleanValueSchema,
    priceMultiplier: preprocessEmptyToUndefined(NonNegativeNumberSchema),
});

/** Aisle layout structure. */
export const AisleStructureSchema = TheatreSeatReferenceSchema.extend({
    layoutType: z.literal("AISLE"),
});

/** Stair layout structure. */
export const StairStructureSchema = TheatreSeatReferenceSchema.extend({
    layoutType: z.literal("STAIR"),
});

/** Layout entry discriminated by layoutType. */
export const TheatreSeatSchema = z.discriminatedUnion(
    "layoutType",
    [SeatingStructureSchema, AisleStructureSchema, StairStructureSchema],
);

/** TypeScript type representing a seat in a theatre layout. */
export type TheatreSeat = z.infer<typeof TheatreSeatSchema>;
