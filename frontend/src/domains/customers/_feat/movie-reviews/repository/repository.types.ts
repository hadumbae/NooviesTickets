/**
 * @fileoverview Type definitions for the customer movie reviews repository.
 */

import {ObjectIdString} from "@noovies-tickets/common";
import {PaginationOptions} from "@noovies-tickets/common";

/** Configuration for fetching a paginated list of reviews by a customer. */
export type GetFetchCustomerReviewsViewDataConfig = {
    customerID: ObjectIdString;
    pagination: PaginationOptions;
}