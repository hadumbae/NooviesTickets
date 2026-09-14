/**
 * @fileoverview Zod schemas and types for validating seat layout data in the seat submission form.
 */

import {z} from "zod";
import {SeatLabelSchema, SeatRowSchema} from "@/domains/seats/_schema/fields";
import {SeatLayoutTypeSchema, SeatTypeSchema} from "@noovies-tickets/common";
import {IDStringSchema, NonNegativeNumberSchema, PositiveIntegerSchema, preprocessEmptyToUndefined, preprocessOptionalField, preprocessToNumber} from "@noovies-tickets/common";
import {URLParamBooleanSchema} from "@/shared/_schemas/boolean";
import {AnyUnionValues} from "@/shared/_types";

/** Base Zod schema containing shared geometric and relational fields for all seat layout elements. */
export const SeatFormBaseSchema = z.object({
    _id: IDStringSchema.readonly().optional(),
    theatre: preprocessEmptyToUndefined(IDStringSchema),
    screen: preprocessEmptyToUndefined(IDStringSchema),
    row: preprocessEmptyToUndefined(SeatRowSchema),
    x: preprocessToNumber(PositiveIntegerSchema),
    y: preprocessToNumber(PositiveIntegerSchema),
    layoutType: SeatLayoutTypeSchema,
});

const SeatingSchema = SeatFormBaseSchema.extend({
    layoutType: z.literal("SEAT"),
    seatNumber: preprocessToNumber(PositiveIntegerSchema),
    seatLabel: preprocessOptionalField(SeatLabelSchema),
    seatType: SeatTypeSchema,
    isAvailable: URLParamBooleanSchema,
    priceMultiplier: preprocessToNumber(NonNegativeNumberSchema),
});

const AisleSchema = SeatFormBaseSchema.extend({
    layoutType: z.literal("AISLE"),
});

const StairSchema = SeatFormBaseSchema.extend({
    layoutType: z.literal("STAIR"),
});

/** Discriminated union Zod schema for validating different types of seat layout elements. */
export const SeatFormSchema = z.discriminatedUnion("layoutType", [
    SeatingSchema,
    AisleSchema,
    StairSchema,
]);

/** Type representing the inferred data structure from the seat form schema. */
export type SeatFormData = z.infer<typeof SeatFormSchema>;

/** Type representing the raw form values for the seat submission form. */
export type SeatFormValues = AnyUnionValues<SeatFormData>;