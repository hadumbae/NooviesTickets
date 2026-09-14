/**
 * @fileoverview Express controller handlers for retrieving movie reviews.
 */

import type {Request, Response} from "express";
import {fetchRequestUserId} from "@/shared/_utils/request/fetchRequestUserId";
import {
    fetchFeaturedReviewsByMovie,
    fetchPaginatedReviewsByMovie,
    fetchReviewDetailsForMovie
} from "@/domains/movies/_feat/fetch-reviews-by-movie/service";
import type {
    FeaturedMovieReviewsRouteConfig,
    MovieReviewsPaginatedRouteConfig
} from "@/domains/movies/_feat/fetch-reviews-by-movie/schema";

/**
 * Handles paginated movie review retrieval.
 */
export async function getReviewsByMovie(
    req: Request, res: Response
): Promise<Response> {
    const {_id: movieID, page, perPage, ...options} = req.parsedConfig as MovieReviewsPaginatedRouteConfig;

    const data = await fetchPaginatedReviewsByMovie({
        movieID,
        page,
        perPage,
        options,
    })

    return res
        .status(200)
        .json(data)
}

/**
 * Returns featured reviews for a movie and the requesting user's review.
 */
export async function getFeaturedReviewsByMovie(
    req: Request, res: Response
): Promise<Response> {
    const {_id: movieID, ...options} = req.parsedConfig as FeaturedMovieReviewsRouteConfig;
    const userID = fetchRequestUserId(req);

    const data = await fetchFeaturedReviewsByMovie({
        movieID,
        userID,
        options,
    });

    return res.status(200).json(data)
}

/**
 * Handles paginated movie review retrieval with aggregate stats and the requesting user's review.
 */
export async function getReviewDetailsByMovie(
    req: Request, res: Response
): Promise<Response> {
    const {_id: movieID, page, perPage, ...options} = req.parsedConfig as MovieReviewsPaginatedRouteConfig;
    const userID = fetchRequestUserId(req);

    const data = await fetchReviewDetailsForMovie({
        userID,
        movieID,
        page,
        perPage,
        options,
    });

    return res
        .status(200)
        .json(data)
}