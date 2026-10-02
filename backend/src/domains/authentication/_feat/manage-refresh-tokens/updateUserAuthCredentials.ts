/**
 * @fileoverview Utility for refreshing user session credentials and rotating refresh tokens.
 */

import createHttpError from "http-errors";
import {type RefreshTokenSchemaFields} from "@/domains/authentication/_models/refresh-token";
import {generateAuthenticationPayload} from "@/domains/authentication/_feat/login-user";
import {createRefreshToken} from "@/domains/authentication/_feat/manage-refresh-tokens/createRefreshToken";
import type {IpString} from "@noovies-tickets/common";
import type {AuthUserCredentials} from "@/domains/authentication/_validation/AuthUserCredentialsSchema";
import {UserModel} from "@/domains/users/_models/user/User.model";
import {validateStaleToken} from "@/domains/authentication/_feat/manage-refresh-tokens/validateStaleToken";
import type {DocumentType} from "@/shared/_types/mongoose/DocumentType";

type UpdateConfig = {
    incomingToken: string;
    ipAddress?: IpString;
}

type UpdateReturns = AuthUserCredentials & {
    refreshToken: DocumentType<RefreshTokenSchemaFields>
    issuedToken: string;
}

/** Revokes the current refresh token and issues a new session payload and rotated token. */
export async function updateUserAuthCredentials(
    {ipAddress, incomingToken}: UpdateConfig
): Promise<UpdateReturns> {
    const staleToken = await validateStaleToken({token: incomingToken});

    const user = await UserModel.findById(staleToken.user).select("_id name email uniqueCode status roles");
    if (!user) throw createHttpError(403, "Forbidden. Unknown user.");

    staleToken.revoked = true;
    await staleToken.save();

    const authData = generateAuthenticationPayload({user});

    const {issuedToken, refreshToken} = await createRefreshToken({
        userID: user._id,
        family: staleToken.family,
        userIp: ipAddress,
    });

    return {
        ...authData,
        refreshToken,
        issuedToken,
    }
}