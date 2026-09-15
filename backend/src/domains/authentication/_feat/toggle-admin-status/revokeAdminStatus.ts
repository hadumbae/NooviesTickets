/**
 * @fileoverview Functionality to remove administrative privileges from a user account.
 */

import {Types} from "mongoose";
import createHttpError from "http-errors";
import {UserModel, type UserSchemaFields} from "@/domains/users/_models/user";

/** Removes the ADMIN role from a user identified by their ID. */
export async function revokeAdminStatus(userID: Types.ObjectId): Promise<UserSchemaFields> {
    const user = await UserModel.findById(userID);
    if (!user) throw createHttpError(404, "User not found!");

    const {roles} = user;

    user.roles = roles.filter((r) => r !== "ADMIN");
    return user.save();
}