/**
 * @fileoverview Zod schema for validating movie credit input data for cast and crew members.
 *
 */

import {z} from "zod";

import {BooleanValueSchema, PositiveNumberSchema, NonEmptyStringSchema, RoleTypeDepartmentSchema} from "@noovies-tickets/common";
import {ObjectIdStringSchema} from "@/shared/schema/mongoose/ObjectIdStringSchema";

/**
 * Base schema for a movie credit input (common fields for both CAST and CREW)
 */
const MovieCreditBaseSchema = z.object({
    movie: ObjectIdStringSchema,
    person: ObjectIdStringSchema,
    department: RoleTypeDepartmentSchema,
    roleType: ObjectIdStringSchema,
    displayRoleName: NonEmptyStringSchema
        .max(150, {message: "Must be 150 characters or less."})
        .optional(),
    creditedAs: NonEmptyStringSchema
        .max(150, {message: "Must be 150 characters or less."})
        .optional(),
    notes: NonEmptyStringSchema
        .max(1000, {message: "Must be 1000 characters or less."})
        .optional(),
});

const UndefinedForCrew = z.undefined({
    required_error: "Required as `undefined`.",
    invalid_type_error: "Must be `undefined`.",
    message: "Must be undefined for `CREW` credits."
}).optional();

/**
 * Schema for CREW credits
 */
const CrewSchema = MovieCreditBaseSchema.extend({
    department: z.literal("CREW"),
    characterName: UndefinedForCrew,
    billingOrder: UndefinedForCrew,
    uncredited: UndefinedForCrew,
    isPrimary: UndefinedForCrew,
    voiceOnly: UndefinedForCrew,
    cameo: UndefinedForCrew,
    motionCapture: UndefinedForCrew,
    archiveFootage: UndefinedForCrew,
});

/**
 * Schema for CAST credits
 */
const CastSchema = MovieCreditBaseSchema.extend({
    department: z.literal("CAST"),
    characterName: NonEmptyStringSchema.max(150, "Job must be 150 characters or less."),
    billingOrder: PositiveNumberSchema.optional(),
    uncredited: BooleanValueSchema.optional(),
    isPrimary: BooleanValueSchema.optional(),
    voiceOnly: BooleanValueSchema.optional(),
    cameo: BooleanValueSchema.optional(),
    motionCapture: BooleanValueSchema.optional(),
    archiveFootage: BooleanValueSchema.optional(),
});

/**
 * Discriminated union schema for validating movie credit creation or update payloads.
 */
export const MovieCreditInputSchema = z
    .discriminatedUnion("department", [CrewSchema, CastSchema])
    .describe("Movie Credit Input");

/** Input data type inferred from the MovieCreditInputSchema. */
export type MovieCreditInputData = z.input<typeof MovieCreditInputSchema>;
