/**
 * @fileoverview Type contracts for fetching reviews by movie.
 */

import {PaginationValues} from "@/common/_feat/fetch-pagination-search-params/schemas/PaginationValuesSchema.ts";
import {RequestOptions} from "@/common/_types/request/RequestOptions.ts";
import {ObjectIdString} from "@noovies-tickets/common";

/** Parameters for retrieving reviews for a movie. */
export type FetchReviewsByMovieConfig = {
    movieID: ObjectIdString;
    config?: RequestOptions;
};

/** Parameters for paginated movie review retrieval. */
export type FetchPaginatedReviewsByMovieConfig = PaginationValues & {
    movieID: ObjectIdString;
    config?: Omit<RequestOptions, "limit">;
};