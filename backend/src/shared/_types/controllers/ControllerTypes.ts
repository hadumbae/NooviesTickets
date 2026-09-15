/**
 * @fileoverview Defines type aliases for Express controller functions used across the application.
 */

import type {Request, Response} from "express";

/** Represents an asynchronous Express controller function. */
export type ControllerAsyncFunc = (req: Request, res: Response) => Promise<Response>;
