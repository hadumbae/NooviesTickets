/**
 * @fileoverview Defines the Mongoose model for User documents.
 */

import {Model, model} from "mongoose";
import type {UserSchemaFields} from "@/domains/users/_models/user/User.types.js";
import {UserSchema} from "@/domains/users/_models/user/User.schema.js";
import "@/domains/users/_models/user/User.hooks";
import "@/domains/users/_models/user/User.virtuals";

/** The Mongoose model for interacting with the users collection. */
export const UserModel: Model<UserSchemaFields> = model<UserSchemaFields>("User", UserSchema);
