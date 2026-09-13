/**
 * @fileoverview Zod schema for validating that a value is a valid native JavaScript Date instance.
 */

import {z} from "zod";

/** Zod schema that ensures a value is a Date instance representing a valid date. */
export const ValidDateInstanceSchema = z
    .instanceof(Date)
    .refine(
        (date) => !isNaN(date.getTime()),
        {message: "Invalid date."},
    );

/** Type representing a validated Date instance. */
export type ValidDateInstance = z.infer<typeof ValidDateInstanceSchema>;
