/**
 * @fileoverview Match-level filters for MovieCredit queries.
 * Maps request query parameters to internal schema fields for direct
 * document-level filtering.
 */

import {z} from "zod";
import {
    BooleanValueSchema,
    IDStringSchema,
    MovieCreditNameStringSchema,
    PositiveNumberSchema,
    preprocessOptionalField,
    preprocessToBoolean,
    RoleTypeDepartmentSchema
} from "@noovies-tickets/common";

/**
 * Match-level filters for MovieCredit queries.
 */
export const MovieCreditQueryMatchFiltersSchema = z.object({
    _id: preprocessOptionalField(IDStringSchema),
    movie: preprocessOptionalField(IDStringSchema),
    person: preprocessOptionalField(IDStringSchema),
    roleType: preprocessOptionalField(IDStringSchema),
    department: preprocessOptionalField(RoleTypeDepartmentSchema),
    characterName: preprocessOptionalField(MovieCreditNameStringSchema),
    billingOrder: preprocessOptionalField(PositiveNumberSchema),
    uncredited: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
    voiceOnly: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
    cameo: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
    motionCapture: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
    isPrimary: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
    archiveFootage: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
    displayRoleName: preprocessOptionalField(MovieCreditNameStringSchema),
    creditedAs: preprocessOptionalField(MovieCreditNameStringSchema),
});

/**
 * Validated match-level filter parameters.
 */
export type MovieCreditQueryMatchFilters = z.infer<typeof MovieCreditQueryMatchFiltersSchema>;