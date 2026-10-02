/**
 * @fileoverview Utility for constructing and signing the authenticated user session payload and token.
 */

import createHttpError from "http-errors";
import type {UserSchemaFields} from "@/domains/users";
import {AuthTokenPayloadSchema} from "@/domains/authentication/_validation/AuthTokenPayloadSchema";
import {type AuthUserCredentials} from "@/domains/authentication/_validation/AuthUserCredentialsSchema";
import {generateAuthenticationHash} from "@/domains/authentication/_feat/login-user/generateAuthenticationHash";

type TokenConfig = {
    user: UserSchemaFields;
}

/** Generates a validated authentication payload along with a signed JWT session token. */
export function generateAuthenticationPayload(
    {user: {_id, name, email, uniqueCode, status, roles}}: TokenConfig
): AuthUserCredentials {
    const {data: payload, success} = AuthTokenPayloadSchema.safeParse({
        isAdmin: roles.includes("ADMIN"),
        user: {_id, name, email, uniqueCode, status, roles},
        status,
    });

    if (!success) {
        throw createHttpError(500, "Unable to generate credentials. Please try again.");
    }

    const authHash = generateAuthenticationHash({payload});

    return {
        ...payload,
        authHash,
    }
}