/**
 * @fileoverview Zod schema for validating and transforming yyyy-MM-dd strings into UTC Date objects.
 */

import {z} from "zod";
import {DateTime} from "luxon";
import {DateOnlyStringSchema} from "./DateOnlyStringSchema";

/** Zod schema that validates a yyyy-MM-dd string and transforms it into a Date at UTC midnight. */
export const UTCDateOnlySchema = DateOnlyStringSchema
    .transform((dateString) => DateTime.fromISO(`${dateString}T00:00:00.000Z`, {zone: "utc"}).toJSDate());

/** Type representing a UTC Date parsed from a valid yyyy-MM-dd string. */
export type UTCDateOnly = z.infer<typeof UTCDateOnlySchema>;
