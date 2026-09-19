/**
 * @fileoverview Utility function for handling and transforming Zod validation errors into request validation errors.
 */

import { ZodError } from "zod";
import {ValidationError} from "@noovies-tickets/common";

/** Handles Zod errors by converting them into structured request validation errors or re-throwing other exceptions. */
export default (error: unknown, message: string = "Validation Failed."): never => {
    if (error instanceof ZodError) {
        const errors = error.issues.map(issue => {
            // Add a `pathString` property for easier reference
            (issue as any).pathString = issue.path.join(".");
            return issue;
        });

        throw new ValidationError({
            errorCode: "ERR_REQUEST_VALIDATION",
            message,
            errors,
            statusCode: 422,
        });
    }

    throw error;
};