/**
 * @fileoverview Type definitions for the customer movie review repository.
 */

import {ObjectIdString} from "@noovies-tickets/common";

/** Configuration parameters for fetching a granular view of a specific movie review. */
export type GetFetchCustomerReviewViewDataConfig = {
    customerID: ObjectIdString;
    reviewID: ObjectIdString;
}