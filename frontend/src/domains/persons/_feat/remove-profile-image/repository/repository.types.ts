/**
 * @fileoverview Type definitions for profile image removal operations.
 */

import {ObjectIdString} from "@noovies-tickets/common";

/**
 * Configuration for removing a person's profile image.
 */
export type RemoveProfileImageConfig = {
    _id: ObjectIdString;
};