/**
 * @fileoverview Utility function to verify if a user email already exists in the database.
 */

import {z} from "zod";
import {UserModel} from "@/domains/users/_models/user";
import {ValidationError} from "@noovies-tickets/common";

/** Checks for email uniqueness and throws a validation error if the email is taken. */
export async function checkIfEmailExists(email: string): Promise<void> {
    const emailCount = await UserModel.countDocuments({email});

    if (emailCount > 0) {
        throw new ValidationError({
            errorCode: "ERR_REQUEST_VALIDATION",
            statusCode: 422,
            errors: [{
                code: z.ZodIssueCode.custom,
                path: ['email'],
                message: "Email Already In Use"
            }],
        });
    }
}