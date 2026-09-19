/**
 * @fileoverview Utility for extracting and validating pagination options from Express request query parameters.
 */

import type {Request} from "express";
import {type PaginationOptions, PaginationOptionsSchema, ValidationError} from "@noovies-tickets/common";

/** Parses and validates incoming request query parameters into a structured pagination object. */
export function fetchRequestPaginationOptions(req: Request): PaginationOptions {
    const {data, success, error} = PaginationOptionsSchema.safeParse(req.query);

    if (!success || !data) {
        throw new ValidationError({
            errorCode: "ERR_QUERY_VALIDATION",
            message: "Invalid request pagination query options.",
            errors: error?.errors,
            statusCode: 400,
        });
    }

    return data;
}