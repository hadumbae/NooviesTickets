/**
 * @fileoverview Base and discriminated schemas for cast and crew movie credits.
 * Defines the validation logic and TypeScript types for movie participation records.
 */

import {z} from "zod";
import {BaseModelDTOSchema} from "../../../schema/model/BaseModelDTOSchema";
import {BooleanValueSchema} from "../../../schema/booleans/BooleanValueSchema";
import {IDStringSchema} from "../../../schema/additional-strings/id-strings/IDStringSchema";
import {NonEmptyStringSchema} from "../../../schema/strings/NonEmptyStringSchema";
import {PositiveNumberSchema} from "../../../schema/numbers/PositiveNumberSchema";
import {SlugStringSchema} from "../../../schema/additional-strings/slug-strings/SlugString";
import {UndefinedValueSchema} from "../../../schema/undefined/UndefinedValueSchema";
import {preprocessOptionalField} from "../../../preprocessors/preprocessOptionalField";
import {preprocessToUndefined} from "../../../preprocessors/preprocessToUndefined";
import {RoleTypeDepartmentSchema} from "../../roletypes/fields";

/**
 * Base schema shared by cast and crew credits.
 */
export const MovieCreditBaseSchema = BaseModelDTOSchema.extend({
    slug: SlugStringSchema,
    department: RoleTypeDepartmentSchema,
    displayRoleName: preprocessOptionalField(NonEmptyStringSchema.max(150, "Must be 150 characters or less.")),
    creditedAs: preprocessOptionalField(NonEmptyStringSchema.max(150, "Must be 150 characters or less.")),
    uncredited: BooleanValueSchema.optional(),
    notes: NonEmptyStringSchema.nullable().optional(),
    movie: IDStringSchema,
    person: IDStringSchema,
    roleType: IDStringSchema,
});

/**
 * Schema for non-performance based credits (e.g., Directing, Production).
 */
export const MovieCreditCrewSchema = MovieCreditBaseSchema.extend({
    department: z.literal("CREW"),
    billingOrder: preprocessToUndefined(UndefinedValueSchema),
    characterName: preprocessToUndefined(UndefinedValueSchema),
    isPrimary: preprocessToUndefined(UndefinedValueSchema),
    voiceOnly: preprocessToUndefined(UndefinedValueSchema),
    cameo: preprocessToUndefined(UndefinedValueSchema),
    motionCapture: preprocessToUndefined(UndefinedValueSchema),
    archiveFootage: preprocessToUndefined(UndefinedValueSchema),
});

/**
 * Schema for performance-based credits.
 */
export const MovieCreditCastSchema = MovieCreditBaseSchema.extend({
    department: z.literal("CAST"),
    characterName: NonEmptyStringSchema,
    billingOrder: PositiveNumberSchema.optional(),
    isPrimary: BooleanValueSchema,
    voiceOnly: BooleanValueSchema,
    cameo: BooleanValueSchema,
    motionCapture: BooleanValueSchema,
    archiveFootage: BooleanValueSchema,
});

/**
 * Discriminated union of movie credit variants.
 */
export const MovieCreditSchema = z.discriminatedUnion("department", [
    MovieCreditCrewSchema,
    MovieCreditCastSchema,
]);

/** Represents a validated crew movie credit. */
export type CrewMovieCredit = z.infer<typeof MovieCreditCrewSchema>;

/** Represents a validated cast movie credit. */
export type CastMovieCredit = z.infer<typeof MovieCreditCastSchema>;

/** Represents a validated movie credit (either cast or crew). */
export type MovieCredit = z.infer<typeof MovieCreditSchema>;
