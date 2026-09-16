/**
 * @fileoverview Zod schema for validating Unix timestamp numbers.
 */

import {z} from "zod";
import {NonNegativeIntegerSchema} from "../numbers/NonNegativeIntegerSchema";

/** Zod schema for validating a number as a valid Unix timestamp. */
export const UnixTimestampNumberSchema = NonNegativeIntegerSchema
    .gte(946684800, {message: "Timestamp is too old."})
    .refine((value) => value <= Math.floor(Date.now() / 1000) + 60, {message: "Timestamp seems to be in the future!"});

/** Type representing a validated Unix timestamp number. */
export type UnixTimestampNumber = z.infer<typeof UnixTimestampNumberSchema>;