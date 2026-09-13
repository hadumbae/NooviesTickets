/**
 * @fileoverview Type definitions for the user password update repository.
 */

import {ObjectIdString} from "@noovies-tickets/common";
import {UserPasswordUpdateFormData} from "@/domains/users/_feat/update-password/schema/UserPasswordUpdateFormSchema.ts";

/** Parameters for updating a user's password. */
export type PasswordUpdateData = {
    userID: ObjectIdString;
    data: UserPasswordUpdateFormData;
};