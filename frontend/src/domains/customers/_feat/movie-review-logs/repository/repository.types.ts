/**
 * @fileoverview Type definitions for the customer review moderation logs repository.
 */

import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params";
import {ObjectIdString} from "@noovies-tickets/common";

/** Configuration for fetching customer review moderation log view data. */
export type GetFetchCustomerReviewLogsViewDataConfig = {
    customerID: ObjectIdString;
    reviewID: ObjectIdString;
    pagination: PaginationValues;
}