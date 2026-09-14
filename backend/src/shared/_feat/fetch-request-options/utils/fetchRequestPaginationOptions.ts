/**
 * @file Extraction utility for standardized pagination configuration from Express query parameters.
 * @filename fetchRequestPaginationOptions.ts
 */

import type {Request} from "express";
import {
    type PaginationOptions,
    PaginationOptionsSchema
} from "@noovies-tickets/common";
import {InvalidRequestQueryError} from "@/shared/_errors/InvalidRequestQueryError";

/**
 * Parses and validates incoming request query parameters into a structured pagination object.
 * ---
 * @param req - The incoming Express Request object containing the raw query string.
 * @returns A validated object conforming to the {@link PaginationOptions} interface.
 * @throws {InvalidRequestQueryError} if the query parameters are missing or malformed.
 */
export function fetchRequestPaginationOptions(req: Request): PaginationOptions {
    const {data, success, error} = PaginationOptionsSchema.safeParse(req.query);

    if (!success || !data) {
        throw new InvalidRequestQueryError({
            message: "Invalid request pagination query options.",
            errors: error?.errors,
        });
    }

    return data;
}