/**
 * @fileoverview Error handlers for the Genre domain.
 * Maps low-level database index violations to user-friendly Zod errors.
 */

import type {ZodIssue} from "zod";
import {ValidationError} from "@noovies-tickets/common";

/**
 * Handles unique constraint violations for Genres.
 * @throws {ValidationError} With a mapped error path and message.
 */
export function handleGenreDuplicateIndex(indexString: string): void | never {
    if (indexString === "name_1") {
        const errors: ZodIssue[] = [
            {
                path: ["name"],
                code: "custom",
                message: "A genre with this name already exists."
            }
        ];

        throw new ValidationError({
            errorCode: "ERR_DUPLICATE_INDEX",
            statusCode: 422,
            errors,
            message: "Duplicate genre name detected."
        });
    }
}