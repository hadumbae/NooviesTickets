/**
 * @fileoverview Type definitions for the user reservations repository.
 */

import {CurrentUserReservationsQueryOptions} from "@/domains/reservations/_feat/fetch-current-user-reservations/schema";
import {PaginationOptions} from "@noovies-tickets/common";

/** Configuration for fetching user reservations including pagination and query filters. */
export type GetFetchUserReservationsConfig = PaginationOptions & {
    queries?: CurrentUserReservationsQueryOptions;
};