/**
 * @fileoverview Express middleware factory for validating request bodies against Zod schemas.
 */

import {type ZodTypeAny} from "zod";
import type {NextFunction, Request, RequestHandler, Response} from "express";
import handleZodError from "./handleZodError.js";

/** Creates an Express middleware for validating request bodies against a Zod schema. */
export const validateZodSchema = (schema: ZodTypeAny): RequestHandler => (req: Request, res: Response, next: NextFunction) => {
    try {
        req.validatedBody = schema.parse(req.body);
        next();
    } catch (e: any) {
        handleZodError(e);
    }
};