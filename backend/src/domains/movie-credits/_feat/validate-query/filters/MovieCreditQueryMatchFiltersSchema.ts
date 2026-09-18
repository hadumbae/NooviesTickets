/**
 * @fileoverview Validation schema for direct attribute filtering of MovieCredit entities.
 * These filters target properties persisted directly on the MovieCredit document.
 */

import {z} from "zod";
import {ObjectIdSchema} from "@/shared/_schema/mongoose/ObjectIdSchema";
import {
    BooleanValueSchema,
    NumberValueSchema, preprocessOptionalField,
    preprocessToBoolean,
    preprocessToNumber,
    RoleTypeDepartmentSchema
} from "@noovies-tickets/common";
import {URLParamRegexPatternSchema} from "@/shared/_feat/parse-query-string";

/**
 * Zod schema defining match-level filters for MovieCredit queries.
 */
export const MovieCreditQueryMatchFiltersSchema = z.object({
    _id: preprocessOptionalField(ObjectIdSchema),
    movie: preprocessOptionalField(ObjectIdSchema),
    person: preprocessOptionalField(ObjectIdSchema),
    roleType: preprocessOptionalField(ObjectIdSchema),
    department: RoleTypeDepartmentSchema.optional(),
    displayRoleName: URLParamRegexPatternSchema,
    creditedAs: URLParamRegexPatternSchema,
    isPrimary: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
    characterName: URLParamRegexPatternSchema,
    billingOrder: preprocessToNumber(NumberValueSchema.optional()).optional(),
    uncredited: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
    voiceOnly: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
    cameo: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
    motionCapture: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
    archiveFootage: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
});

/**
 * TypeScript type inferred from MovieCreditQueryMatchFiltersSchema.
 */
export type MovieCreditQueryMatchFilters = z.infer<typeof MovieCreditQueryMatchFiltersSchema>;
