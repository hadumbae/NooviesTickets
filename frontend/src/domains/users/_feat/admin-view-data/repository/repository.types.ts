/**
 * @fileoverview Type definitions for the user details admin view data repository.
 */

import {ObjectIdString} from "@noovies-tickets/common";

/** Configuration for fetching composite user details view data. */
export type GetFetchUserDetailsViewDataConfig = {
    userID: ObjectIdString;
    reviewCount?: number;
    reservationCount?: number;
};