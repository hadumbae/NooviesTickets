/**
 * @fileoverview Utility function for revoking all active refresh tokens associated with a given user.
 */

import {Types} from "mongoose";
import {RefreshTokenModel} from "@/domains/authentication/_models/refresh-token/RefreshToken.model";

type ClearConfig = {
    userId: Types.ObjectId;
}

/** Revokes all refresh tokens for a specified user ID. */
export async function revokeUserRefreshTokens(
    {userId}: ClearConfig,
): Promise<void> {
    await RefreshTokenModel.updateMany({user: userId}, {$set: {revoked: true}});
}