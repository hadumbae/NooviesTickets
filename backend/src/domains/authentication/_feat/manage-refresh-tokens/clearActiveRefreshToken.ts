/**
 * @fileoverview Utility for clearing and revoking an active refresh token based on its raw string value.
 */

import crypto from "crypto";
import {RefreshTokenModel} from "@/domains/authentication/_models/refresh-token/RefreshToken.model";
import {revokeUserRefreshTokens} from "@/domains/authentication/_feat/manage-refresh-tokens/revokeUserRefreshTokens";

/** Props for the TokenConfig type. */
type TokenConfig = {
    rawString?: string;
}

/** Hashes a raw refresh token string and revokes the associated user tokens. */
export async function clearActiveRefreshToken(
    {rawString}: TokenConfig
) {
    if (!rawString) {
        console.warn(`No active token, value received: ${rawString}`);
        return;
    }

    const tokenHash = crypto.createHash("sha256").update(rawString).digest("hex");
    const staleToken = await RefreshTokenModel.findOne({tokenHash});

    if (!staleToken) {
        console.warn(`Invalid Refresh Token: ${rawString}`);
        return;
    }

    await revokeUserRefreshTokens({userId: staleToken.user});
}