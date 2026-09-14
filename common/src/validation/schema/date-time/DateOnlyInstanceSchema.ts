/**
 * @fileoverview Zod schema for validating and transforming yyyy-MM-dd strings into local Date instances.
 */

import {z} from "zod";
import {DateTime} from "luxon";
import {DateOnlyStringSchema} from "./DateOnlyStringSchema";

/** Zod schema that validates a yyyy-MM-dd string and transforms it into a Date at local midnight. */
export const DateOnlyInstanceSchema = DateOnlyStringSchema
    .transform((dateString) => DateTime.fromFormat(dateString, "yyyy-MM-dd").startOf("day"))
    .refine((dateTime) => dateTime.isValid, {message: "Invalid date."})
    .transform((dateTime) => dateTime.toJSDate());

/** Type representing a Date parsed from a valid yyyy-MM-dd string, interpreted in the local timezone. */
export type DateOnlyInstance = z.infer<typeof DateOnlyInstanceSchema>;
