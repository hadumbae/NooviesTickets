/**
 * @fileoverview Defines the validation schema for a theatre's seat capacity.
 */

import {z} from "zod";
import {NonNegativeNumberSchema, preprocessToNumber} from "@noovies-tickets/common";

/** Zod schema for validating and coercing theatre seat capacity values. */
export const TheatreSeatCapacitySchema = preprocessToNumber(
    NonNegativeNumberSchema.max(2500, "Max. 2500")
);

/** Type definition for a theatre's seat capacity. */
export type TheatreSeatCapacity = z.infer<typeof TheatreSeatCapacitySchema>;