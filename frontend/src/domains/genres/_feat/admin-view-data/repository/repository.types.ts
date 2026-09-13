/**
 * @fileoverview Type definitions for the GenreAdminViewDataRepository.
 */

import {PaginationOptions} from "@noovies-tickets/common";
import {SlugString} from "@noovies-tickets/common";

/** Parameters for fetching detailed genre administrative view data. */
export type FetchGenreDetailsConfig = {
    slug: SlugString;
    queries: PaginationOptions;
};