/**
 * @fileoverview Utility function for generating and persisting user refresh tokens.
 */

import crypto from "crypto";
import {Types} from "mongoose";
import {DateTime} from "luxon";
import type {IpString} from "@noovies-tickets/common";
import {getEnvVariables} from "@/shared/_feat/env/getEnvVariables";
import {RefreshTokenModel} from "@/domains/authentication/_models/refresh-token/RefreshToken.model";
import type {RefreshTokenSchemaFields} from "@/domains/authentication/_models/refresh-token/RefreshToken.types";
import {createRefreshTokenHash} from "@/domains/authentication/_feat/manage-refresh-tokens/createRefreshTokenHash";
import type {DocumentType} from "@/shared/_types/mongoose/DocumentType";

type CreateConfig = {
    userIp?: IpString;
    userID: Types.ObjectId;
    family?: string;
}

type TokenReturns = {
    refreshToken: DocumentType<RefreshTokenSchemaFields>;
    issuedToken: string;
}

/** Creates and saves a new refresh token for a given user and IP address. */
export async function createRefreshToken(
    {userIp, userID, family}: CreateConfig
): Promise<TokenReturns> {
    const {REFRESH_TOKEN_LIFETIME} = getEnvVariables();

    const {tokenHash, rawToken} = createRefreshTokenHash();
    const tokenFamily = family ?? crypto.randomUUID();
    const expiresAt = DateTime.now().plus({day: REFRESH_TOKEN_LIFETIME}).toJSDate();

    const data = new RefreshTokenModel({
        ip: userIp,
        family: tokenFamily,
        user: userID,
        tokenHash,
        expiresAt,
    });

    return {
        refreshToken: await data.save(),
        issuedToken: rawToken,
    };
}