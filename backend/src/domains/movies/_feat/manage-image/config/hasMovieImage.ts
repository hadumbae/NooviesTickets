/**
 * @fileoverview Express middleware for validating movie image upload requests using Zod schema.
 */

import type {NextFunction, Request, Response} from "express";
import {ValidationError} from "@noovies-tickets/common";
import {MovieImageInputSchema} from "@/domains/movies/_feat/manage-image/config/MovieImageInputSchema";

/**
 * Validates that an uploaded movie image file exists and meets schema constraints.
 */
export function hasMovieImage(req: Request, res: Response, next: NextFunction): void {
    const requestBody = {image: req.file};
    const {data, success, error} = MovieImageInputSchema.safeParse(requestBody);

    if (!success) {
        throw new ValidationError({
            errorCode: "ERR_REQUEST_VALIDATION",
            message: "Invalid Movie Image Upload.",
            errors: error.errors,
            raw: requestBody,
            statusCode: 422,
        });
    }

    req.validatedBody = data;
    next();
}