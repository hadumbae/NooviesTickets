/**
 * @fileoverview Utility for generating signed authentication JWT tokens.
 */

import {getEnvVariables} from "@/shared/_feat";
import jwt from "jsonwebtoken";
import type {AuthTokenPayload} from "@/domains/authentication";

/** Props for the GenerationConfig type. */
type GenerationConfig = {
    payload: AuthTokenPayload;
}

/**
 * Generates a signed JWT authentication token based on the provided payload and expiration configuration.
 */
export function generateAuthenticationHash(
    { payload }: GenerationConfig,
): string {
    const {CREDENTIALS_EXPIRY_DURATION} = getEnvVariables();
    return jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn: `${CREDENTIALS_EXPIRY_DURATION}m`});
}