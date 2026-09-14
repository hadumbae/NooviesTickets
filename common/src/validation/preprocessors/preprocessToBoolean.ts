/**
 * @fileoverview Utility for preprocessing common boolean-like string literals into real boolean values.
 */

import {z, type ZodType, type ZodTypeDef} from "zod";

/** Case-insensitive string values treated as `true`. */
const TRUTHY_VALUES = new Set(["true", "1", "yes", "on", "y", "enabled"]);

/** Case-insensitive string values treated as `false`. */
const FALSY_VALUES = new Set(["false", "0", "no", "off", "n", "disabled", ""]);

/**
 * Wraps a Zod schema to convert common boolean-like string literals (case-insensitive, whitespace-trimmed)
 * into real booleans before validation. Values outside the recognized set are passed through unchanged,
 * letting the wrapped schema reject them.
 */
export function preprocessToBoolean<TData>(
    schema: ZodType<TData, ZodTypeDef, unknown>
): z.ZodEffects<ZodType<TData, ZodTypeDef, unknown>, TData, unknown> {
    return z.preprocess(
        (val) => {
            if (typeof val !== "string") return val;

            const normalised = val.trim().toLowerCase();

            if (TRUTHY_VALUES.has(normalised)) return true;
            if (FALSY_VALUES.has(normalised)) return false;

            return val;
        },
        schema
    );
}
