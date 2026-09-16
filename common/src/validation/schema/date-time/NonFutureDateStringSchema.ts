/**
 * @fileoverview Zod schema for validating date strings that represent current or past dates.
 */

import {z} from "zod";
import {DateOnlyStringSchema} from "./DateOnlyStringSchema";
import {UTCDateOnlySchema} from "./UTCDateOnlySchema";

/** Validates that a string is a valid date in yyyy-MM-dd format and does not occur in the future, compared in UTC. */
export const NonFutureDateStringSchema = DateOnlyStringSchema.superRefine((value: string, ctx) => {
    const result = UTCDateOnlySchema.safeParse(value);

    if (result.success && result.data.getTime() > Date.now()) {
        ctx.addIssue({
            code: "custom",
            path: [],
            message: "Must be a current or past date.",
            fatal: true,
        });
    }
});

/** A string representing a valid date that is not in the future. */
export type NonFutureDateString = z.infer<typeof NonFutureDateStringSchema>;