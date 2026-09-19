/**
 * @fileoverview Handler for HTTP 422 Unprocessable Entity responses that parses validation errors.
 */

import {ZodIssue} from "zod";
import HttpResponseError from "@/shared/_err/HttpResponseError.ts";
import {ValidationError, ValidationErrorPayloadSchema} from "@noovies-tickets/common";

type HandleParams = {
    url: string;
    headers: Headers;
    payload: unknown;
    status: number;
    statusText: string;
    source?: string;
};

/**
 * Validates the error payload and throws a FormValidationError containing specific field errors.
 */
export function handle422Response(
    {payload, url, status, statusText, headers}: HandleParams
): never {
    const {success: isFormError, data} = ValidationErrorPayloadSchema.safeParse(payload);

    if (!isFormError) {
        const message = "HTTP 422: Unprocessable Entity (Malformed Error Payload)";
        throw new HttpResponseError({url, headers, status, message, statusText, payload});
    }

    const {statusCode, errorCode, errors} = data;

    throw new ValidationError({
        errorCode,
        statusCode,
        errors: errors as ZodIssue[],
        message: "HTTP 422: Validation Failed",
    });
}