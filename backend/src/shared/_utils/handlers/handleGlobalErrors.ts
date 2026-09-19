/**
 * @fileoverview Global Express error-handling middleware for intercepting and formatting application exceptions.
 */

import type {ErrorRequestHandler, NextFunction, Request, Response} from "express";
import {isHttpError} from "http-errors";
import {handleGlobalZodErrors, isGlobalZodError} from "./errors/handleGlobalZodErrors.js";
import {handleGlobalMongooseErrors, isGlobalMongooseError} from "./errors/handleGlobalMongooseErrors.js";
import {handleBookingError, isBookingError} from "./errors/handleBookingErrors.js";
import {ValidationError} from "@noovies-tickets/common";
import {handleValidationErrors} from "@/shared/_utils/handlers/errors/handleValidationErrors";

/** Global Express error-handling middleware function. */
const handleGlobalErrors: ErrorRequestHandler = (
    error: Error, req: Request, res: Response, next: NextFunction
): void => {
    console.error("ERROR HANDLER |", error);

    if (isGlobalZodError(error)) {
        handleGlobalZodErrors(error, res);
        return;
    }

    if (isGlobalMongooseError(error)) {
        handleGlobalMongooseErrors(error, res);
        return;
    }

    if (isBookingError(error)) {
        handleBookingError(error, res);
        return;
    }

    if (error instanceof ValidationError) {
        handleValidationErrors(error, res);
        return;
    }

    let message = "Oops. Something went wrong!";
    let status = 500;

    if (isHttpError(error)) {
        message = error.message;
        status = error.status;
    }

    res.status(status).json({message});
};

export default handleGlobalErrors;