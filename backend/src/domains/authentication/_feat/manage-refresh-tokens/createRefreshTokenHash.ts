/**
 * @fileoverview Utility for generating cryptographic refresh tokens and their corresponding hashes.
 */

import crypto from "crypto";

/** Props for the TokenReturns type. */
type TokenReturns = {
    rawToken: string;
    tokenHash: string;
}

/** Generates a secure random raw refresh token and its SHA-256 hash. */
export function createRefreshTokenHash(): TokenReturns {
    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

    return {
        rawToken,
        tokenHash,
    };
}