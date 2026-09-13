/**
 * @fileoverview Zod schema for validating and transforming yyyy-MM-dd strings into UTC Date objects.
 */

import {z} from "zod";
import {DateOnlyStringSchema} from "./DateOnlyStringSchema";

/** Zod schema that validates a yyyy-MM-dd string and transforms it into a Date at UTC midnight. */
export const UTCDateOnlySchema = DateOnlyStringSchema.transform((dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(Date.UTC(year, month - 1, day));
});

/** Type representing a UTC Date parsed from a valid yyyy-MM-dd string. */
export type UTCDateOnly = z.infer<typeof UTCDateOnlySchema>;
