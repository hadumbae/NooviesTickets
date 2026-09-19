/**
 * @fileoverview Custom error class representing a Zod-based validation failure shared between frontend and backend.
 */

import type {ZodIssue} from "zod";
import type {ValidationErrorCode} from "../validation/schema/enums/validation-error-code/ValidationErrorCodeSchema";

type ErrorParams = {
    /** Discriminant identifying which validation avenue produced this error. */
    errorCode: ValidationErrorCode;

    /** Zod validation issues describing each failure. */
    errors: ZodIssue[];

    /** Optional high-level error message. */
    message?: string;

    /** Original input that failed validation. */
    raw?: unknown;

    /** Optional HTTP status code associated with the failure. */
    statusCode?: number;
};

type ValidationErrorJSONObject = {
    errorCode: ValidationErrorCode;
    message?: string;
    errors: ZodIssue[];
    raw?: unknown;
    statusCode?: number;
}

/** Custom error thrown when data fails Zod schema validation. */
export class ValidationError extends Error {
    public readonly errorCode: ValidationErrorCode;
    public readonly errors: ZodIssue[];
    public readonly raw?: unknown;
    public readonly statusCode?: number;

    constructor({errorCode, errors, message, raw, statusCode}: ErrorParams) {
        super(message);

        this.name = "ValidationError";

        this.errorCode = errorCode;
        this.errors = errors;
        this.raw = raw;
        this.statusCode = statusCode;
    }

    toString(): string {
        return `[${this.name}] ${this.errorCode}${this.statusCode ? ` | HTTP${this.statusCode}` : ""}`;
    }

    toJSON(): ValidationErrorJSONObject {
        return {
            errorCode: this.errorCode,
            message: this.message,
            errors: this.errors,
            raw: this.raw,
            statusCode: this.statusCode,
        };
    }
}