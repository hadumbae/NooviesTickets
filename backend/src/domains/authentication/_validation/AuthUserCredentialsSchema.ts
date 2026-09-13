/**
 * @fileoverview Zod schema and TypeScript type definition for authenticated user credentials, including the session token.
 */

import {z} from "zod";
import {StringValueSchema} from "@noovies-tickets/common";
import {AuthTokenPayloadSchema} from "@/domains/authentication/_validation/AuthTokenPayloadSchema";

/** Zod validation schema for user credentials containing token payload and session token. */
export const AuthUserCredentialsSchema = AuthTokenPayloadSchema.extend({
    authHash: StringValueSchema,
});

/** Represents user authentication credentials derived from AuthUserCredentialsSchema. */
export type AuthUserCredentials = z.infer<typeof AuthUserCredentialsSchema>;