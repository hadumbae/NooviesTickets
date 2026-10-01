/**
 * @fileoverview Express route controller for handling user authentication session refreshes and cookie rotation.
 */

import type {Request, Response} from 'express'
import {
    updateUserAuthCredentials
} from "@/domains/authentication/_feat/manage-refresh-tokens/updateUserAuthCredentials";
import {convertToMilliseconds, getEnvVariables} from "@/shared/_feat";
import {DateTime} from "luxon";
import {fetchRequestIP} from "@/shared/_utils/request/fetchRequestIP";
import createHttpError from "http-errors";

/** Handles session token rotation and updates authentication cookies for the requesting user. */
export async function postRefreshUserAuthentication(req: Request, res: Response) {
    const {
        REFRESH_EXPIRY_DURATION,
        REFRESH_TOKEN_LIFETIME,
        CREDENTIALS_EXPIRY_DURATION,
        REQUIRE_SECURE_COOKIES,
    } = getEnvVariables();

    const ipAddress = fetchRequestIP(req);
    const incomingToken = req.refreshToken;

    if (!incomingToken) {
        throw createHttpError(401, "Missing refresh token.");
    }

    const {user, issuedToken, authHash} = await updateUserAuthCredentials({incomingToken, ipAddress});

    const refreshBy = DateTime.now().setZone("UTC").plus({minute: REFRESH_EXPIRY_DURATION}).toISO();
    const refreshTokenLife = convertToMilliseconds({value: REFRESH_TOKEN_LIFETIME, from: "days"});
    const authTokenLife = convertToMilliseconds({value: CREDENTIALS_EXPIRY_DURATION, from: "minutes"});

    return res
        .cookie("hasAuthToken", true, {secure: REQUIRE_SECURE_COOKIES, maxAge: authTokenLife})
        .cookie("refreshBy", refreshBy, {secure: REQUIRE_SECURE_COOKIES, maxAge: refreshTokenLife})
        .cookie("authToken", authHash, {httpOnly: true, secure: REQUIRE_SECURE_COOKIES, maxAge: authTokenLife})
        .cookie("refreshToken", issuedToken, {httpOnly: true, secure: REQUIRE_SECURE_COOKIES, maxAge: refreshTokenLife})
        .json(user);
}