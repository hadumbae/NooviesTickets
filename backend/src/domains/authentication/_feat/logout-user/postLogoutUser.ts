/**
 * @fileoverview Express controller for logging out users and clearing authentication cookies.
 */

import type {Request, Response} from "express";
import {clearActiveRefreshToken} from "@/domains/authentication/_feat/manage-refresh-tokens/clearActiveRefreshToken";

/** Clears authentication cookies to log out the user. */
export async function postLogoutUser(req: Request, res: Response): Promise<Response> {
    const refreshToken = req.refreshToken;
    await clearActiveRefreshToken({rawString: refreshToken});

    return res
        .status(200)
        .clearCookie("hasAuthToken")
        .clearCookie("authToken")
        .clearCookie("refreshToken")
        .clearCookie("refreshBy")
        .json({message: "Logged out."});
}