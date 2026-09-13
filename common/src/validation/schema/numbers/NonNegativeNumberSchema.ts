/**
 * @fileoverview Zod schema and type definition for validating non-negative numbers.
 */

import {z} from "zod";
import {NumberValueSchema} from "./NumberValueSchema";

/** Zod schema that validates a number is greater than or equal to zero. */
export const NonNegativeNumberSchema = NumberValueSchema.nonnegative({message: "Must Not Be Negative."});

/** Type inferred from the non-negative number schema. */
export type NonNegativeNumber = z.infer<typeof NonNegativeNumberSchema>;