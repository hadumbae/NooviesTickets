/**
 * @fileoverview Zod schema definitions and types for generic database query option parameters.
 */

import { z } from "zod";
import {
   CoercedBooleanValueSchema,
   NonNegativeNumberSchema,
   preprocessOptionalField,
   preprocessToNumber
} from "@noovies-tickets/common";

/** Schema for validating optional query execution parameters such as pagination, population, and limits. */
export const QueryOptionParamsSchema = z.object({
   populate: preprocessOptionalField(CoercedBooleanValueSchema),
   virtuals: preprocessOptionalField(CoercedBooleanValueSchema),
   paginated: preprocessOptionalField(CoercedBooleanValueSchema),
   limit: preprocessToNumber(NonNegativeNumberSchema.optional()).optional(),
});

/** Parsed type representation for query option parameters. */
export type QueryOptionParams = z.infer<typeof QueryOptionParamsSchema>;
