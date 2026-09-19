/**
 * @fileoverview Middleware to validate the presence and format of a genre image upload.
 */

import {ValidationError} from "@noovies-tickets/common";
import type {NextFunction, Request, Response} from "express";
import {GenreImageInputSchema} from "@/domains/genres/_feat/manage-image/schema/GenreImageInputSchema";

/**
 * Validates the uploaded file against the GenreImageInputSchema and attaches the result to the request. */
export function hasGenreImage(req: Request, res: Response, next: NextFunction) {
    const requestBody = {image: req.file};
    const {data, success, error} = GenreImageInputSchema.safeParse(requestBody);

    if (!success) {
        throw new ValidationError({
            errorCode: "ERR_REQUEST_VALIDATION",
            message: "Invalid Genre Image Upload.",
            errors: error.errors,
            raw: requestBody,
            statusCode: 422,
        });
    }

    req.validatedBody = data;

    next();
}