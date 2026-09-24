/**
 * @fileoverview Error handlers for SeatMap model operations.
 */

import type {ZodIssue} from "zod";
import {ValidationError} from "@noovies-tickets/common";

/** Handles MongoDB duplicate key errors by transforming them into formatted ValidationErrors. */
export function handleDuplicateIndex(indexString: string): void | never {
    if (indexString === "showing_1_seat_1") {
        const errors: ZodIssue[] = [
            {
                path: ["showing"],
                code: "custom",
                message: "This showing already contains this seat.",
            },
            {
                path: ["seat"],
                code: "custom",
                message: "A seat cannot be mapped more than once within the same showing.",
            },
        ];

        throw new ValidationError({
            errorCode: "ERR_DUPLICATE_INDEX",
            statusCode: 422,
            errors,
            message: "Duplicate seat mapping detected. Each seat can be assigned only once per showing.",
        });
    }
}