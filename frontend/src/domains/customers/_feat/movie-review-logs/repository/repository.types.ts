/**
 * @fileoverview Type definitions for the customer review moderation logs repository.
 */

import {PaginationOptions} from "@noovies-tickets/common";
import {ObjectIdString} from "@noovies-tickets/common";

/** Configuration for fetching customer review moderation log view data. */
export type GetFetchCustomerReviewLogsViewDataConfig = {
    customerID: ObjectIdString;
    reviewID: ObjectIdString;
    pagination: PaginationOptions;
}