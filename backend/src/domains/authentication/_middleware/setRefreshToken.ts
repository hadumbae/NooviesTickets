/**
 * @fileoverview Express middleware to extract the refresh token from request cookies and attach it to the request object.
 */

import type {NextFunction, Request, Response} from 'express';

/** Extracts the refresh token from cookies and assigns it to req.refreshToken. */
export function setRefreshToken(req: Request, res: Response, next: NextFunction) {
    const {refreshToken} = req.cookies;
    req.refreshToken = refreshToken;
    next();
}