/**
 * @fileoverview Maps an HTTP status code to the corresponding HttpResponseErrorCode.
 */

import type {HttpResponseErrorCode} from "../validation/schema/enums/http-response-error-code/HttpResponseErrorCodeSchema";

/** Derives the HttpResponseErrorCode discriminant for a given HTTP status code. */
export function deriveHttpResponseErrorCode(statusCode: number): HttpResponseErrorCode {
    if (statusCode === 401) return "ERR_UNAUTHORIZED";
    if (statusCode === 403) return "ERR_FORBIDDEN";

    return "ERR_HTTP_RESPONSE";
}
