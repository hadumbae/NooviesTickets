/**
 * @fileoverview Data retrieval utility for fetching a movie and its associated showings with pagination support.
 */

import {MovieModel, type MovieSchemaFields, MovieSummarySelect} from "@/domains/movies";
import {ShowingModel, type ShowingSchemaFields} from "@/domains/showings";
import type {PaginationReturns} from "@/shared/_types";
import {MovieShowingSummarySelect} from "@/domains/showings/_feat/query-population/MovieShowingSummarySelect";
import type {SlugString} from "@noovies-tickets/common";
import createHttpError from "http-errors";

/** Configuration parameters for fetching a movie with its showings. */
type FetchConfig = {
    slug: SlugString;
    page: number;
    perPage: number;
}

/** Return structure containing the movie document and paginated showings. */
type FetchReturns = {
    movie: MovieSchemaFields;
    showings: PaginationReturns<ShowingSchemaFields>;
}

/** Fetches a movie record along with its paginated showings sorted by start time. */
export async function fetchMovieWithShowings(
    {slug, page, perPage}: FetchConfig,
): Promise<FetchReturns> {
    const movie = await MovieModel
        .findOne({slug})
        .select(MovieSummarySelect)
        .populate("genres")
        .lean();

    if (!movie) {
        throw createHttpError(404, "Movie not found.");
    }

    const totalQuery = ShowingModel.countDocuments({movie: movie._id});
    const itemQuery = ShowingModel
        .find({movie: movie._id})
        .select(MovieShowingSummarySelect)
        .sort({startTime: -1})
        .skip((page - 1) * perPage)
        .limit(perPage)
        .lean();

    const [totalItems, items] = await Promise.all([
        totalQuery,
        itemQuery,
    ]);

    return {
        movie,
        showings: {
            items,
            totalItems,
        },
    };
}