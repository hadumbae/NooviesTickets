/**
 * @fileoverview Utility for refreshing user session credentials and rotating refresh tokens.
 */

import crypto from "crypto";
import createHttpError from "http-errors";
import {RefreshTokenModel} from "@/domains/authentication/_models/refresh-token";
import {generateAuthenticationPayload} from "@/domains/authentication/_feat/login-user";
import {createRefreshToken} from "@/domains/authentication/_feat/manage-refresh-tokens/createRefreshToken";
import type {IpString} from "@noovies-tickets/common";
import type {AuthUserCredentials} from "@/domains/authentication";
import {UserModel} from "@/domains/users";

type UpdateConfig = {
    incomingToken: string;
    ipAddress?: IpString;
}

type UpdateReturns = AuthUserCredentials & {
    issuedToken: string;
}

/** Revokes the current refresh token and issues a new session payload and rotated token. */
export async function updateUserAuthCredentials(
    {ipAddress, incomingToken}: UpdateConfig
): Promise<UpdateReturns> {
    const incomingHashed = crypto.createHash("sha256").update(incomingToken).digest("hex");

    const staleToken = await RefreshTokenModel.findOne({tokenHash: incomingHashed});
    if (!staleToken) throw createHttpError(401, "Invalid. Refresh Token Required.");

    if (staleToken.revoked) {
        await RefreshTokenModel.updateMany({family: staleToken.family}, {$set: {revoked: true}});
        throw createHttpError(403, "Forbidden. Token Already Revoked.");
    }

    const user = await UserModel.findById(staleToken.user).select("_id name email uniqueCode status roles");
    if (!user) throw createHttpError(403, "Forbidden. Unknown user.");

    staleToken.revoked = true;
    await staleToken.save();

    const authData = generateAuthenticationPayload({user});

    const {issuedToken} = await createRefreshToken({
        userID: user._id,
        family: staleToken.family,
        userIp: ipAddress,
    });

    return {
        ...authData,
        issuedToken,
    }
}