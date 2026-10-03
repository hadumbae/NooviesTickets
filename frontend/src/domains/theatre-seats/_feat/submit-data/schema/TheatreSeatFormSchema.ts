/**
 * @fileoverview Zod schemas and types for validating seat layout data in the seat submission form.
 */

import {z} from "zod";
import {
    TheatreSeatLabelSchema,
    TheatreSeatRowSchema,
    TheatreSeatLayoutTypeSchema,
    TheatreSeatTypeSchema,
    IDStringSchema,
    NonNegativeNumberSchema,
    PositiveIntegerSchema,
    preprocessEmptyToUndefined,
    preprocessOptionalField,
    preprocessToNumber,
} from "@noovies-tickets/common";
import {URLParamBooleanSchema} from "@/shared/_schemas/boolean";
import {AnyUnionValues} from "@/shared/_types";

/** Base Zod schema containing shared geometric and relational fields for all seat layout elements. */
export const TheatreSeatFormBaseSchema = z.object({
    _id: IDStringSchema.readonly().optional(),
    theatre: preprocessEmptyToUndefined(IDStringSchema),
    screen: preprocessEmptyToUndefined(IDStringSchema),
    row: preprocessEmptyToUndefined(TheatreSeatRowSchema),
    x: preprocessToNumber(PositiveIntegerSchema),
    y: preprocessToNumber(PositiveIntegerSchema),
    layoutType: TheatreSeatLayoutTypeSchema,
});

const SeatingSchema = TheatreSeatFormBaseSchema.extend({
    layoutType: z.literal("SEAT"),
    seatNumber: preprocessToNumber(PositiveIntegerSchema),
    seatLabel: preprocessOptionalField(TheatreSeatLabelSchema),
    seatType: TheatreSeatTypeSchema,
    isAvailable: URLParamBooleanSchema,
    priceMultiplier: preprocessToNumber(NonNegativeNumberSchema),
});

const AisleSchema = TheatreSeatFormBaseSchema.extend({
    layoutType: z.literal("AISLE"),
});

const StairSchema = TheatreSeatFormBaseSchema.extend({
    layoutType: z.literal("STAIR"),
});

/** Discriminated union Zod schema for validating different types of seat layout elements. */
export const TheatreSeatFormSchema = z.discriminatedUnion("layoutType", [
    SeatingSchema,
    AisleSchema,
    StairSchema,
]);

/** Type representing the inferred data structure from the seat form schema. */
export type TheatreSeatFormData = z.infer<typeof TheatreSeatFormSchema>;

/** Type representing the raw form values for the seat submission form. */
export type TheatreSeatFormValues = AnyUnionValues<TheatreSeatFormData>;
