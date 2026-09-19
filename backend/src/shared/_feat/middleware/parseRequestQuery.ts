/**
 * @fileoverview Express middleware factory for validating and attaching query options to the request object.
 */

import {type ZodTypeAny} from "zod";
import {ValidationError} from "@noovies-tickets/common";
import type {NextFunction, Request, RequestHandler, Response} from "express";

type ParseParams<TSchema extends ZodTypeAny> = {
    schema: TSchema;
};

/** Creates an Express middleware that intercepts the request to validate URL search parameters. */
export function parseRequestQuery<TSchema extends ZodTypeAny>(
    {schema}: ParseParams<TSchema>
): RequestHandler {
    return (req: Request, _res: Response, next: NextFunction) => {
        const {data, success, error} = schema.safeParse(req.query);

        if (!success) {
            throw new ValidationError({
                errorCode: "ERR_QUERY_VALIDATION",
                message: "Invalid query options.",
                errors: error?.errors,
                statusCode: 400,
            });
        }

        req.requestQuery = data;

        next();
    };
}