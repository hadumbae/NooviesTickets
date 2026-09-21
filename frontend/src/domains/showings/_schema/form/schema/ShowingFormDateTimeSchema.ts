/**
 * @fileoverview Zod schema for validating showing start and end date/time form inputs.
 */

import {z} from "zod";
import {TimeStringSchema, DateOnlyStringSchema, preprocessEmptyToUndefined, IANATimezoneSchema} from "@noovies-tickets/common";

/**
 * Schema for showing date and time inputs that normalizes empty strings to undefined.
 */
export const ShowingFormDateTimeSchema = z.object({
    startAtTime: preprocessEmptyToUndefined(TimeStringSchema),
    startAtDate: preprocessEmptyToUndefined(DateOnlyStringSchema),
    endAtTime: preprocessEmptyToUndefined(TimeStringSchema),
    endAtDate: preprocessEmptyToUndefined(DateOnlyStringSchema),
    timezone: preprocessEmptyToUndefined(IANATimezoneSchema),
});

/**
 * Inferred type for showing date/time form values.
 */
export type ShowingFormDateTimes = z.infer<typeof ShowingFormDateTimeSchema>;