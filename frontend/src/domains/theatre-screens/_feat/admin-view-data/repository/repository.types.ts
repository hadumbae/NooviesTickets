/**
 * @fileoverview Type definitions for the theatre screen admin view data repository.
 */

import {SlugString} from "@noovies-tickets/common";

/** Configuration for fetching theatre screen administrative view data. */
export type FetchTheatreScreenAdminViewDataConfig = {
    theatreSlug: SlugString;
    screenSlug: SlugString;
    recentShowingsCount?: number;
};