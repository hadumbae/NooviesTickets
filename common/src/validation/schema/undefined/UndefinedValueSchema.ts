/**
 * @fileoverview Zod schema and type definition for validating undefined values.
 */

import {z} from "zod";

/** Schema for validating that an input value is strictly undefined. */
export const UndefinedValueSchema = z.undefined({
    invalid_type_error: "Must Be `undefined`",
    required_error: "Required",
});

/** Inferred TypeScript type for validated undefined values. */
export type UndefinedValueSchema = z.infer<typeof UndefinedValueSchema>;