/**
 * @fileoverview Defines a Zod schema for validating non-negative integer values.
 */

import {z} from "zod";
import {NonNegativeNumberSchema} from "./NonNegativeNumberSchema";

/** Zod schema that validates a number is an integer and greater than or equal to zero. */
export const NonNegativeIntegerSchema = NonNegativeNumberSchema.int({message: "Must Be An Integer"});

/** Type inferred from the NonNegativeIntegerSchema. */
export type NonNegativeInteger = z.infer<typeof NonNegativeIntegerSchema>;