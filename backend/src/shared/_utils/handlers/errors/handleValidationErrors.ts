/**
 * @fileoverview Express error-handling middleware for processing validation errors and sending formatted responses.
 */

import type {Response} from 'express';
import {ValidationError} from "@noovies-tickets/common";

/** Handles validation errors by mapping them to appropriate HTTP status codes and responses. */
export const handleValidationErrors = (error: unknown, res: Response) => {
    if (error instanceof ValidationError) {
        const {message, errors, errorCode, statusCode} = error.toJSON();

        if (errorCode === "ERR_QUERY_VALIDATION") {
            res.status(statusCode ?? 400).json({
                statusCode: statusCode ?? 400,
                message: message ?? "[QUERY] Invalid Request Config",
                errorCode,
                errors,
            });

            return;
        }

        if (errorCode === "ERR_REQUEST_VALIDATION") {
            res.status(statusCode ?? 422).json({
                statusCode: statusCode ?? 422,
                message: message ?? "[REQUEST] Invalid Request Body",
                errorCode,
                errors,
            });

            return;
        }

        if (errorCode === "ERR_DATA_VALIDATION") {
            res.status(statusCode ?? 500).json({
                statusCode: statusCode ?? 500,
                message: message ?? "[DATA] Data Validation Failed",
                errorCode,
                errors,
            });

            return;
        }

        res.status(statusCode ?? 500).json({
            errorCode: "ERR_UNKNOWN_VALIDATION_ISSUE",
            statusCode: statusCode ?? 500,
            message,
            errors,
        });

        return;
    }
};