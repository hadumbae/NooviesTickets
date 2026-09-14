/**
 * @fileoverview Zod schema definitions and types for generic database query option parameters.
 */

import { z } from "zod";
import {
   BooleanValueSchema,
   NonNegativeNumberSchema,
   preprocessToBoolean,
   preprocessToNumber
} from "@noovies-tickets/common";

/** Schema for validating optional query execution parameters such as pagination, population, and limits. */
export const QueryOptionParamsSchema = z.object({
   populate: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
   virtuals: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
   paginated: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
   limit: preprocessToNumber(NonNegativeNumberSchema.optional()).optional(),
});

/** Parsed type representation for query option parameters. */
export type QueryOptionParams = z.infer<typeof QueryOptionParamsSchema>;
