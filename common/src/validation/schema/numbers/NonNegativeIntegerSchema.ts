/**
 * @fileoverview Defines a Zod schema for validating non-negative integer values.
 */

import {z} from "zod";
import {NumberValueSchema} from "./NumberValueSchema";

/** Zod schema that validates a number is an integer and greater than or equal to zero. */
export const NonNegativeIntegerSchema = NumberValueSchema
    .int({message: "Must Be An Integer."})
    .nonnegative({message: "Must Be Non-Negative."});

/** Type inferred from the NonNegativeIntegerSchema. */
export type NonNegativeInteger = z.infer<typeof NonNegativeIntegerSchema>;