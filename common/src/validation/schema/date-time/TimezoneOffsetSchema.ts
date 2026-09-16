/**
 * @fileoverview Zod schema for validating timezone offset strings.
 */

import {z} from "zod";
import {StringValueSchema} from "../strings/StringValueSchema";

/** Zod schema validating timezone offsets in ±HH:MM format, bounded to the real-world UTC offset range of -12:00 to +14:00. */
export const TimezoneOffsetSchema = StringValueSchema.regex(
    /^(?:-(?:0\d|1[0-2])|\+(?:0\d|1[0-3]|14)):[0-5]\d$/,
    {message: "Invalid timezone offset format. Expected ±HH:MM"},
);

/** Type representing a validated timezone offset string. */
export type TimezoneOffsetValue = z.infer<typeof TimezoneOffsetSchema>;
