/**
 * @fileoverview Zod schema and type definition for validating null values.
 */

import {z} from "zod";

/** Schema for validating that an input value is strictly null. */
export const NullValueSchema = z.null({
    invalid_type_error: "Must Be `null`",
    required_error: "Required",
});

/** Inferred TypeScript type for validated null values. */
export type NullValueSchema = z.infer<typeof NullValueSchema>;