/**
 * @fileoverview Middleware for parsing and validating sort parameters from request queries using Zod.
 */

import {type ZodType, type ZodTypeDef} from "zod";
import type {NextFunction, Request, RequestHandler, Response} from "express";
import {ValidationError} from "@noovies-tickets/common";

type ParseConfig<TOutput extends Record<string, 1 | -1>> = {
    schema: ZodType<TOutput, ZodTypeDef, unknown>;
};

/** Creates an Express middleware that validates and attaches sort options to the request object. */
export function parseQuerySorts<TOutput extends Record<string, 1 | -1>>(
    {schema}: ParseConfig<TOutput>
): RequestHandler {
    return (req: Request, _res: Response, next: NextFunction) => {
        const {data, success, error} = schema.safeParse(req.query);

        if (!success) {
            throw new ValidationError({
                errorCode: "ERR_QUERY_VALIDATION",
                errors: error?.errors,
                message: "Invalid query sorts.",
                statusCode: 400,
            });
        }

        req.querySorts = data;

        next();
    };
}