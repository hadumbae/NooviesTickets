/**
 * @fileoverview Handles user authentication by validating credentials and generating a JWT.
 */

import bcrypt from "bcryptjs";
import createHttpError from "http-errors";
import {ValidationError} from "@noovies-tickets/common";
import {UserModel} from "@/domains/users/_models/user";
import type {UserLoginInput} from "@/domains/authentication/_feat/login-user/UserLoginInputSchema";
import {type AuthUserCredentials} from "@/domains/authentication/_validation/AuthUserCredentialsSchema";
import {generateAuthenticationPayload} from "@/domains/authentication/_feat/login-user/generateAuthenticationPayload";

type LoginConfig = {
    data: UserLoginInput;
}

/**
 * Authenticates a user against stored credentials and returns a signed token with user details.
 * Requires a valid JWT_SECRET environment variable.
 */
export async function loginUser(
    {data: {email: inputEmail, password: inputPassword}}: LoginConfig
): Promise<AuthUserCredentials> {
    const user = await UserModel.findOne({email: inputEmail});
    if (!user) throw createHttpError(404, "User not found!");

    const {password, status} = user;
    if (status !== "ACTIVE") throw createHttpError(401, "User is suspended/inactive!");

    const isValid = await bcrypt.compare(inputPassword, password);

    if (!isValid) {
        throw new ValidationError({
            errorCode: "ERR_REQUEST_VALIDATION",
            message: "Authentication failed.",
            statusCode: 422,
            errors: [
                {code: "custom", message: "Invalid Credentials.", path: ["email"]},
                {code: "custom", message: "Invalid Credentials.", path: ["password"]},
            ],
        });
    }

    return generateAuthenticationPayload({user});
}