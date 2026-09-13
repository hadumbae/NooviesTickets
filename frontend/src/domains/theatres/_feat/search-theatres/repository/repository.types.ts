/**
 * @fileoverview Type definitions for theatre search operations.
 */

import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params";
import {ISO3166Alpha2CountryCode} from "@noovies-tickets/common";

/**
 * Parameters for browsing theatres by location.
 */
export type BrowseTheatreByLocationConfig = PaginationValues & {
    target?: string;
    country?: ISO3166Alpha2CountryCode;
    showingsPerTheatre?: number;
};