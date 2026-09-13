/**
 * @fileoverview Zod schema for validating positive numbers.
 */

import {z} from "zod";
import {NumberValueSchema} from "./NumberValueSchema";

/** Zod schema for validating positive numbers. */
export const PositiveNumberSchema = NumberValueSchema.positive({message: "Must be a positive number."});

/** Type definition for a positive number. */
export type PositiveNumber = z.infer<typeof PositiveNumberSchema>;