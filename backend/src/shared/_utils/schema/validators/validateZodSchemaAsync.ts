/**
 * @fileoverview Express middleware for asynchronously validating request body data against a Zod schema.
 */

import type {NextFunction, Request, Response} from "express";
import type {ZodTypeAny} from "zod";
import asyncHandler from "../../handlers/asyncHandler.js";
import handleZodError from "./handleZodError.js";

/** Creates an Express middleware to asynchronously validate request body data against a Zod schema. */
export const validateZodSchemaAsync = (schema: ZodTypeAny) => asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.validatedBody = await schema.parseAsync(req.body);
            next();
        } catch (e: unknown) {
            handleZodError(e);
        }
    }
);

