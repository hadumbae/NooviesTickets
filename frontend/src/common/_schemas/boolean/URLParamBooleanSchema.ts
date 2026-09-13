/**
 * @fileoverview Zod schema for parsing a flexible boolean value.
 */

import {z} from "zod";

/**
 * Zod schema for parsing a flexible boolean value.
 *
 * This schema accepts the string literals `"true"` and `"false"`—converting them
 * into actual boolean values—as well as native boolean types (`true`, `false`).
 *
 * Useful for parsing boolean values from URL search params or form inputs where
 * values may be passed as strings but interpreted as booleans.
 *
 * Returns:
 * - `true` if the value is `"true"` or `true`
 * - `false` if the value is `"false"` or `false`
 * - `undefined` if the value is not present (due to `.optional()`)
 *
 * @example
 * ```ts
 * URLParamBooleanSchema.parse("true");  // true
 * URLParamBooleanSchema.parse("false"); // false
 * URLParamBooleanSchema.parse(true);    // true
 * URLParamBooleanSchema.parse(false);   // false
 * URLParamBooleanSchema.parse(undefined); // undefined
 * ```
 */
export const URLParamBooleanSchema = z
    .union(
        [z.literal("true").transform(() => true), z.literal("false").transform(() => false), z.boolean()],
        {message: "Invalid boolean string."},
    )
    .optional();
