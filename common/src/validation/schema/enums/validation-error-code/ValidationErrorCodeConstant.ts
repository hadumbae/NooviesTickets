/**
 * @fileoverview Defines the canonical set of Zod-validation error codes shared
 * between frontend and backend.
 */

/** A constant array of allowed validation error codes. */
export const ValidationErrorCodeConstant = [
    "ERR_QUERY_VALIDATION",
    "ERR_REQUEST_VALIDATION",
    "ERR_DATA_VALIDATION",
    "ERR_UNKNOWN_VALIDATION_ISSUE",
] as const;
