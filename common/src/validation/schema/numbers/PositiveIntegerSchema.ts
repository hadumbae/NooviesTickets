/**
 * @fileoverview Defines a Zod schema for validating positive integer values.
 */

import {z} from "zod";
import {PositiveNumberSchema} from "./PositiveNumberSchema";

/** Zod schema that validates a number is both an integer and positive. */
export const PositiveIntegerSchema = PositiveNumberSchema.int({message: "Must Be An Integer"});

/** Type inferred from the PositiveIntegerSchema. */
export type PositiveInteger = z.infer<typeof PositiveIntegerSchema>;