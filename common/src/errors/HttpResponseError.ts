/**
 * @fileoverview Custom error class representing a non-success HTTP response,
 * shared between frontend and backend so both sides can discriminate on `errorCode`.
 */

import type {URLString} from "../validation/schema/strings/URLStringSchema";
import type {HttpResponseErrorCode} from "../validation/schema/enums/http-response-error-code/HttpResponseErrorCodeSchema";

type ErrorParams = {
    /** Discriminant identifying the class of HTTP failure. */
    errorCode: HttpResponseErrorCode;

    /** Request URL associated with the response. */
    url: URLString;

    /** HTTP response status code. */
    statusCode: number;

    /** Optional high-level error message. */
    message?: string;
};

type HttpResponseErrorJSONObject = {
    errorCode: HttpResponseErrorCode;
    url: URLString;
    statusCode: number;
    message?: string;
};

/** Custom error thrown for non-success HTTP responses. */
export class HttpResponseError extends Error {
    public readonly errorCode: HttpResponseErrorCode;
    public readonly url: URLString;
    public readonly statusCode: number;

    constructor({errorCode, url, statusCode, message}: ErrorParams) {
        super(message);

        this.name = "HttpResponseError";

        this.errorCode = errorCode;
        this.url = url;
        this.statusCode = statusCode;
    }

    toString(): string {
        return `[${this.name}] ${this.errorCode} | HTTP${this.statusCode} | ${this.url}`;
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
