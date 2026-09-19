/**
 * @fileoverview Middleware for parsing and validating request query parameters using Zod schemas.
 */

import {type ZodType, type ZodTypeDef} from "zod";
import type {NextFunction, Request, RequestHandler, Response} from "express";
import {ValidationError} from "@noovies-tickets/common";

type ParseConfig<TOutput extends Record<string, unknown>> = {
    schema: ZodType<TOutput, ZodTypeDef, unknown>;
};

/** Creates an Express middleware to validate request query parameters against a Zod schema. */
export function parseQueryFilters<TOutput extends Record<string, unknown>>(
    {schema}: ParseConfig<TOutput>
): RequestHandler {
    return (req: Request, _res: Response, next: NextFunction) => {
        const {data, success, error} = schema.safeParse(req.query);

        if (!success) {
            throw new ValidationError({
                errorCode: "ERR_QUERY_VALIDATION",
                message: "Invalid query filters.",
                errors: error?.errors,
                statusCode: 400,
            });
        }

        req.queryFilters = data;

        next();
    };
}