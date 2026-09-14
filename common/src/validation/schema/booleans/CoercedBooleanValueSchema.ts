/**
 * @fileoverview Zod schema definitions and type for coerced boolean input values.
 */

import {z} from "zod";

/** Schema for parsing and coercing non-boolean inputs into boolean values. */
export const CoercedBooleanValueSchema = z.coerce.boolean({
    required_error: "Required",
    invalid_type_error: "Must be a boolean",
});

/** Parsed type representation for coerced boolean values. */
export type CoercedBooleanValue = z.infer<typeof CoercedBooleanValueSchema>;