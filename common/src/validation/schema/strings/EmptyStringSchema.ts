/**
 * @fileoverview Zod schema and type for validating empty string literals.
 */

import {z} from "zod";
import {StringValueSchema} from "./StringValueSchema";

/** A Zod schema that validates an empty string literal. */
export const EmptyStringSchema = StringValueSchema.length(0, "Must be an empty string");

/** A TypeScript type representing the literal empty string. */
export type EmptyString = z.infer<typeof EmptyStringSchema>;