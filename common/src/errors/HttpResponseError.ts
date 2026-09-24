/**
 * @fileoverview Custom error class representing an HTTP request failure shared between frontend and backend.
 */

import type {URLString} from "../validation/schema/strings/URLStringSchema";
import type {HttpResponseErrorCode} from "../validation/schema/enums/http-response-error-code/HttpResponseErrorCodeSchema";

/** Props for the ErrorParams type. */
type ErrorParams = {
    /** Discriminant identifying the class of HTTP failure. */
    errorCode: HttpResponseErrorCode;

    /** Request URL associated with the failure. */
    url: URLString;

    /** HTTP response status code. Absent for transport-level failures (e.g. `ERR_NETWORK`). */
    statusCode?: number;

    /** Optional high-level error message. */
    message?: string;
};

/** Props for the HttpResponseErrorJSONObject type. */
type HttpResponseErrorJSONObject = {
    errorCode: HttpResponseErrorCode;
    url: URLString;
    statusCode?: number;
    message?: string;
};

/** Custom error thrown for HTTP request failures, whether a bad response or no response at all. */
export class HttpResponseError extends Error {
    public readonly errorCode: HttpResponseErrorCode;
    public readonly url: URLString;
    public readonly statusCode?: number;

    constructor({errorCode, url, statusCode, message}: ErrorParams) {
        super(message);

        this.name = "HttpResponseError";

        this.errorCode = errorCode;
        this.url = url;
        this.statusCode = statusCode;
    }

    toString(): string {
        return `[${this.name}] ${this.errorCode}${this.statusCode ? ` | HTTP${this.statusCode}` : ""} | ${this.url}`;
    }

    toJSON(): HttpResponseErrorJSONObject {
        return {
            errorCode: this.errorCode,
            url: this.url,
            statusCode: this.statusCode,
            message: this.message,
        };
    }
}