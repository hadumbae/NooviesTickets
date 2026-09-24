/**
 * @fileoverview Utility functions for identifying and handling global Zod and request validation errors in Express responses.
 */

import type {Response} from 'express';
import {ZodError} from "zod";

/** Determines whether an error is a globally handled Zod-related or request validation error. */
export const isGlobalZodError = (error: unknown) =>
    error instanceof ZodError;

/** Maps globally recognized Zod and validation errors to their corresponding HTTP responses. */
export const handleGlobalZodErrors = (error: unknown, res: Response) => {
    if (error instanceof ZodError) {
        const payload = {
            statusCode: "422",
            errorCode: "form_validation_failed",
            issue: "Validation Failed",
            description: "Form Validation Failed. Please try again.",
            errors: error.errors
        };

        res.status(422).json(payload);
        return;
    }
};