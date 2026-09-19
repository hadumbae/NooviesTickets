/**
 * @fileoverview Handler for HTTP 422 Unprocessable Entity responses that parses validation errors.
 */

import {ZodIssue} from "zod";
import {HttpResponseError, ValidationError, ValidationErrorPayloadSchema} from "@noovies-tickets/common";

type HandleParams = {
    url: string;
    payload: unknown;
    status: number;
    source?: string;
};

/**
 * Validates the error payload and throws a FormValidationError containing specific field errors.
 */
export function handle422Response(
    {payload, url, status}: HandleParams
): never {
    const {success: isFormError, data} = ValidationErrorPayloadSchema.safeParse(payload);

    if (!isFormError) {
        throw new HttpResponseError({
            errorCode: "ERR_HTTP_RESPONSE",
            url,
            statusCode: status,
            message: "HTTP 422: Unprocessable Entity (Malformed Error Payload)",
        });
    }

    const {statusCode, errorCode, errors} = data;

    throw new ValidationError({
        errorCode,
        statusCode,
        errors: errors as ZodIssue[],
        message: "HTTP 422: Validation Failed",
    });
}