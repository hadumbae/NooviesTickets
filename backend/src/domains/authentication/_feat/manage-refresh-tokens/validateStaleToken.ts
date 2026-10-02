/**
 * @fileoverview Validates an incoming refresh token against the database and checks for revocation.
 */

import createHttpError from "http-errors";
import crypto from "crypto";
import type {DocumentType} from "@/shared/_types/mongoose/DocumentType";
import {RefreshTokenModel} from "@/domains/authentication/_models/refresh-token/RefreshToken.model";
import {type RefreshTokenSchemaFields} from "@/domains/authentication/_models/refresh-token/RefreshToken.types";

/** Props for the ValidateConfig type. */
type ValidateConfig = {
    token: string;
}

/** Validates a refresh token string and handles revocation security rules. */
export async function validateStaleToken(
    {token}: ValidateConfig
): Promise<DocumentType<RefreshTokenSchemaFields>> {
    const incomingHashed = crypto.createHash("sha256").update(token).digest("hex");

    const staleToken = await RefreshTokenModel.findOne({tokenHash: incomingHashed});
    if (!staleToken) throw createHttpError(401, "Invalid. Refresh Token Required.");

    if (staleToken.revoked) {
        await RefreshTokenModel.updateMany({family: staleToken.family}, {$set: {revoked: true}});
        throw createHttpError(403, "Forbidden. Token Already Revoked.");
    }

    return staleToken;
}