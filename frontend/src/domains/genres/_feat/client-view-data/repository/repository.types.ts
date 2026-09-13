/**
 * @fileoverview Type definitions for the genre client view data repository.
 */

import {PaginationOptions} from "@noovies-tickets/common";
import {SlugString} from "@noovies-tickets/common";

/** Configuration required to fetch a genre and its movies. */
export type FetchGenreWithMoviesConfig = {
    slug: SlugString;
    moviePagination: PaginationOptions;
};