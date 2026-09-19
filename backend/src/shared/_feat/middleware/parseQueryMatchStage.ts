/**
 * @fileoverview Express middleware factory for validating and attaching query options to the request object.
 */

import {type ZodType, type ZodTypeDef} from "zod";
import type {NextFunction, Request, RequestHandler, Response} from "express";
import type {PipelineStage} from "mongoose";
import {ValidationError} from "@noovies-tickets/common";

/** Props configuration for the parse query match stage middleware. */
type ParseParams = {
    schema: ZodType<PipelineStage.Match, ZodTypeDef, unknown>;
};

/** Validates request query parameters against a Zod schema and attaches the parsed match stage to the request object. */
export function parseQueryMatchStage({schema}: ParseParams): RequestHandler {
    return (req: Request, _res: Response, next: NextFunction) => {
        const {data, success, error} = schema.safeParse(req.query);

        if (!success) {
            throw new ValidationError({
                errorCode: "ERR_QUERY_VALIDATION",
                message: "Invalid query matching options.",
                errors: error?.errors,
                statusCode: 400,
            });
        }

        req.queryMatchStage = data;

        next();
    };
}