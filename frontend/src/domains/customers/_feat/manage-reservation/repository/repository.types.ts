/**
 * @fileoverview Type definitions for configuration options used in customer reservation data fetching.
 */

import {ObjectIdString} from "@noovies-tickets/common";

/** Configuration parameters required to fetch data for a specific customer reservation view. */
export type GetFetchCustomerReservationViewDataConfig = {
    customerID: ObjectIdString;
    reservationID: ObjectIdString;
}