/**
 * @fileoverview Type definition for user status update request configuration options.
 */

import {ObjectIdString} from "@noovies-tickets/common";
import {UpdateUserStatusFormData} from "@/domains/users/_feat/manage-user-status/schema";

/** Configuration parameters required to update a user's status. */
export type UpdateUserStatusConfig = {
    userId: ObjectIdString;
    data: UpdateUserStatusFormData;
};