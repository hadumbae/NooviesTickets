import type {SlugString} from "@noovies-tickets/common";
import createHttpError from "http-errors";
import {Types} from "mongoose";
import {MovieModel, type MovieSchemaFields} from "@/domains/movies/_models";
import {MoviePopulationPaths} from "@/domains/movies/_feat/query-population";
import {
    type ReviewDetailsByMovieReturns
} from "@/domains/movies/_feat/fetch-reviews-by-movie";
import {
    fetchReviewDetailsForMovie
} from "@/domains/movies/_feat/fetch-reviews-by-movie/service/fetchReviewDetailsForMovie";

export type FetchMovieInfoReviewsViewDataConfig = {
    userID: Types.ObjectId;
    slug: SlugString;
    page: number;
    perPage: number;
}

export type MovieInfoReviewsViewData = {
    movie: MovieSchemaFields;
    reviewDetails: ReviewDetailsByMovieReturns;
};

export async function fetchMovieInfoReviewsViewData(
    {userID, slug, page, perPage}: FetchMovieInfoReviewsViewDataConfig
): Promise<MovieInfoReviewsViewData> {
    const movie = await MovieModel
        .findOne({slug})
        .populate(MoviePopulationPaths)
        .lean({virtuals: true});

    if (!movie) throw createHttpError(404, "Movie not found.");

    const reviewDetails = await fetchReviewDetailsForMovie({
        userID,
        movieID: movie._id,
        page,
        perPage,
        options: {populate: true, virtuals: true},
    });

    return {
        movie,
        reviewDetails,
    };
}