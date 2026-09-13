/**
 * @fileoverview Type definitions for the Genre Client View Data service.
 * Defines the input configurations and structured return types for public genre views.
 */

import type {PaginationOptions, SlugString} from "@noovies-tickets/common";
import type {GenreSchemaFields} from "@/domains/genres/_models/genre";
import type {PaginationReturns} from "@/shared/_types/pagination/PaginationReturns";
import type {MovieWithGenres} from "@/domains/movies/_models/movie/Movie.types";

/**
 * Configuration object for the `fetchGenreWithMovies` service function.
 */
export type FetchGenreWithMoviesConfig = {
    slug: SlugString;
    moviePagination: PaginationOptions;
}

/**
 * The consolidated response structure for the Genre browsing view.
 */
export type GenreWithMoviesReturns = {
    genre: GenreSchemaFields;
    movies: PaginationReturns<MovieWithGenres>;
}