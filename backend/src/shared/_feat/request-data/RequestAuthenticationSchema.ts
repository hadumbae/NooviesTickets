/**
 * @fileoverview Zod schema and TypeScript type definition for validating request-scoped authentication context.
 */

import {z} from "zod";
import {ObjectIdSchema} from "@/shared/_schema/mongoose/ObjectIdSchema";
import {BooleanValueSchema, StringValueSchema, UserStatusSchema} from "@noovies-tickets/common";

/** Zod validation schema for request-scoped authentication data properties. */
export const RequestAuthenticationSchema = z.object({
    authUserID: ObjectIdSchema,
    authUserIsAdmin: BooleanValueSchema,
    authUserStatus: UserStatusSchema,
    isLoggedIn: BooleanValueSchema,
    authToken: StringValueSchema,
    refreshToken: StringValueSchema,
});

/** Represents validated authentication data attached to the request context. */
export type RequestAuthenticationData = z.infer<typeof RequestAuthenticationSchema>;