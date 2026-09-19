/**
 * @fileoverview Express middleware factory for centralized request validation.
 * Merges route parameters and query strings into a single object for unified
 * schema validation using Zod.
 */

import {type ZodType, type ZodTypeDef} from "zod";
import type {NextFunction, Request, Response} from "express";
import {ValidationError} from "@noovies-tickets/common";

/**
 * Configuration options for the request validation middleware.
 */
type ValidationParams<TData> = {
    schema: ZodType<TData, ZodTypeDef, unknown>;
    errorMessage?: string;
};

/**
 * A middleware factory that validates incoming request parameters and queries.
 */
export function validateRequestConfig<TData = unknown>(params: ValidationParams<TData>) {
    const {schema, errorMessage = "Invalid request parameters or query."} = params;

    return (req: Request, res: Response, next: NextFunction) => {
        const raw = {...req.params, ...req.query};

        const {data, error, success} = schema.safeParse(raw);

        if (!success) {
            throw new ValidationError({
                errorCode: "ERR_QUERY_VALIDATION",
                message: errorMessage,
                errors: error?.errors ?? [],
                statusCode: 400,
            });
        }

        req.parsedConfig = data as TData;

        next();
    };
}