/**
 * @fileoverview Type contracts for fetching reviews by movie.
 */

import {RequestOptions} from "@/common/_types/request/RequestOptions.ts";
import {ObjectIdString, PaginationOptions} from "@noovies-tickets/common";

/** Parameters for retrieving reviews for a movie. */
export type FetchReviewsByMovieConfig = {
    movieID: ObjectIdString;
    config?: RequestOptions;
};

/** Parameters for paginated movie review retrieval. */
export type FetchPaginatedReviewsByMovieConfig = PaginationOptions & {
    movieID: ObjectIdString;
    config?: Omit<RequestOptions, "limit">;
};