/**
 * @fileoverview Zod schema for validating native JavaScript Date instances.
 */

import {z} from "zod";

/** Zod schema validating that a value is an instance of Date. */
export const DateInstanceSchema = z.instanceof(
    Date,
    {message: "Must be an instance of Date."},
);

/** Type representing a validated Date instance. */
export type DateInstance = z.infer<typeof DateInstanceSchema>;
