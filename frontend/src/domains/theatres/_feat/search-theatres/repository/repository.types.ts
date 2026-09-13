/**
 * @fileoverview Type definitions for theatre search operations.
 */

import {PaginationOptions} from "@noovies-tickets/common";
import {ISO3166Alpha2CountryCode} from "@noovies-tickets/common";

/**
 * Parameters for browsing theatres by location.
 */
export type BrowseTheatreByLocationConfig = PaginationOptions & {
    target?: string;
    country?: ISO3166Alpha2CountryCode;
    showingsPerTheatre?: number;
};