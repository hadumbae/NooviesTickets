/**
 * @fileoverview Type definitions for the Theatre Admin View repository configuration.
 */

import {SlugString} from "@noovies-tickets/common";

/**
 * Configuration parameters for retrieving theatre-specific dashboard data.
 */
export type GetFetchTheatreDetailsViewDataConfig = {
    slug: SlugString;
    queries?: {
        screenPage?: number;
        screenPerPage?: number;
        showingLimit?: number;
    }
};

/**
 * Configuration parameters for retrieving a paginated list of theatre showings.
 */
export type GetFetchTheatreShowingListViewDataConfig = {
    slug: SlugString;
    queries?: {
        page?: number;
        perPage?: number;
    };
};