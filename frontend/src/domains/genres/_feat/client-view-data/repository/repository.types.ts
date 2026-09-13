/**
 * @fileoverview Type definitions for the genre client view data repository.
 */

import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params";
import {SlugString} from "@noovies-tickets/common";

/** Configuration required to fetch a genre and its movies. */
export type FetchGenreWithMoviesConfig = {
    slug: SlugString;
    moviePagination: PaginationValues;
};