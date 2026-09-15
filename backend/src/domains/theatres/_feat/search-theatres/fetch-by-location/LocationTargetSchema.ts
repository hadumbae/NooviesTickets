/**
 * @fileoverview Zod schema and inferred type for validating location target query values.
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "@noovies-tickets/common";

/**
 * Schema for validating free-form or standardized location targets.
 */
export const LocationTargetSchema = NonEmptyStringSchema.max(500, {message: "Must be 500 characters or less."});

/**
 * Free-form or standardized location target value.
 */
export type LocationTarget = z.infer<typeof LocationTargetSchema>;
