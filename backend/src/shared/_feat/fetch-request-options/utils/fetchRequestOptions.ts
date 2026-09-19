/**
 * @fileoverview Utility for extracting and validating request options from Express query parameters.
 */

import type {Request} from "express";
import {ValidationError} from "@noovies-tickets/common";
import {type RequestOptions, RequestOptionsSchema} from "@/shared/_feat/fetch-request-options/schemas";

/** Extracts and validates request query options, throwing a validation error if parsing fails. */
export function fetchRequestOptions(req: Request): RequestOptions {
    const {data, success, error} = RequestOptionsSchema.safeParse(req.query);

    if (!success || !data) {
        throw new ValidationError({
            errorCode: "ERR_QUERY_VALIDATION",
            message: "Invalid request query options.",
            errors: error?.errors,
            statusCode: 400,
        });
    }

    return data;
}