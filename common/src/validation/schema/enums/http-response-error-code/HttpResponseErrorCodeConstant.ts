/**
 * @fileoverview Defines the canonical set of HTTP-response error codes shared
 * between frontend and backend.
 */

/** A constant array of allowed HTTP response error codes. */
export const HttpResponseErrorCodeConstant = [
    "ERR_UNAUTHORIZED",
    "ERR_FORBIDDEN",
    "ERR_HTTP_RESPONSE",
    "ERR_NETWORK",
] as const;
