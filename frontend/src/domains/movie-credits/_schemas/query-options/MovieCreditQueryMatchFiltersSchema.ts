/**
 * @fileoverview Match-level filters for MovieCredit queries.
 * Maps request query parameters to internal schema fields for direct
 * document-level filtering.
 */

import {z} from "zod";
import {IDStringSchema, PositiveNumberSchema, RoleTypeDepartmentSchema} from "@noovies-tickets/common";
import {URLParamBooleanSchema} from "@/shared/_schemas/boolean";
import {NonEmptyStringSchema} from "@noovies-tickets/common";

/**
 * Match-level filters for MovieCredit queries.
 */
export const MovieCreditQueryMatchFiltersSchema = z.object({
    _id: IDStringSchema.optional(),
    movie: IDStringSchema.optional(),
    person: IDStringSchema.optional(),
    roleType: IDStringSchema.optional(),
    department: RoleTypeDepartmentSchema.optional(),
    characterName: NonEmptyStringSchema.optional(),
    billingOrder: PositiveNumberSchema.optional(),
    uncredited: URLParamBooleanSchema,
    voiceOnly: URLParamBooleanSchema,
    cameo: URLParamBooleanSchema,
    motionCapture: URLParamBooleanSchema,
    isPrimary: URLParamBooleanSchema,
    archiveFootage: URLParamBooleanSchema,
    displayRoleName: NonEmptyStringSchema
        .max(150, {message: "Must be 150 characters or less."})
        .optional(),
    creditedAs: NonEmptyStringSchema
        .max(150, {message: "Must be 150 characters or less."})
        .optional(),
});

/**
 * Validated match-level filter parameters.
 */
export type MovieCreditQueryMatchFilters = z.infer<typeof MovieCreditQueryMatchFiltersSchema>;