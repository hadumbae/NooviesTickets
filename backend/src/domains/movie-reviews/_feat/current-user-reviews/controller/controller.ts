/**
 * @file HTTP controllers for current-user MovieReview routes.
 * @filename MyMovieReviewController.ts
 */

import type {Request, Response} from "express";
import * as MyMovieReviewService from "@/domains/movie-reviews/_feat/current-user-reviews/service";
import {fetchRequestUserId} from "@/shared/_utils/request/fetchRequestUserId";
import type {
    MovieReviewCreateInputData,
    MovieReviewUpdateInputData
} from "@/domains/movie-reviews/_feat/validate-submit/schemas";
import type {
    MyMovieReviewListRouteConfig,
    MyMovieReviewOptionsRouteConfig,
    MyReviewIDRouteConfig,
    MyReviewUpdateRouteConfig
} from "@/domains/movie-reviews/_feat/current-user-reviews/schema";

/**
 * Retrieves a single Movie Review owned by the authenticated user.
 */
export async function getFetchCurrentUserMovieReview(
    req: Request, res: Response
): Promise<Response> {
    const {reviewID} = req.parsedConfig as MyReviewIDRouteConfig;
    const review = await MyMovieReviewService.fetchCurrentUserMovieReview(reviewID);

    return res
        .status(200)
        .json(review);
}

/**
 * Returns a paginated list of Movie Reviews authored by the authenticated user.
 */
export async function getFetchCurrentUserMovieReviewList(
    req: Request, res: Response
): Promise<Response> {
    const userID = fetchRequestUserId(req);
    const {page, perPage, populate, virtuals} = req.parsedConfig as MyMovieReviewListRouteConfig;

    const data = await MyMovieReviewService.fetchCurrentUserMovieReviewList({
        userID,
        page,
        perPage,
        options: {populate, virtuals},
    });

    return res
        .status(200)
        .json(data);
}

/**
 * Creates a new Movie Review for the authenticated user.
 */
export async function postCreateMovieReviewForCurrentUser(
    req: Request, res: Response
): Promise<Response> {
    const userID = fetchRequestUserId(req);
    const {populate, virtuals} = req.parsedConfig as MyMovieReviewOptionsRouteConfig;

    const data = req.validatedBody as MovieReviewCreateInputData;

    const review = await MyMovieReviewService.createMovieReviewForCurrentUser({
        userID,
        data,
        options: {populate, virtuals},
    });

    return res
        .status(200)
        .json(review);
}

/**
 * Updates an existing Movie Review owned by the authenticated user.
 */
export async function patchUpdateMovieReviewForCurrentUser(
    req: Request, res: Response
): Promise<Response> {
    const userID = fetchRequestUserId(req);
    const {reviewID, populate, virtuals} = req.parsedConfig as MyReviewUpdateRouteConfig;

    const data = req.validatedBody as MovieReviewUpdateInputData;
    const unset = req.unsetFields;

    const review = await MyMovieReviewService.updateMovieReviewForCurrentUser({
        userID,
        reviewID,
        data,
        unset,
        options: {populate, virtuals},
    });

    return res
        .status(200)
        .json(review);
}

/**
 * Removes a Movie Review authored by the current user.
 */
export async function deleteRemoveMovieReviewForCurrentUser(
    req: Request, res: Response
): Promise<Response> {
    const userID = fetchRequestUserId(req);
    const {reviewID} = req.parsedConfig as MyReviewIDRouteConfig;

    await MyMovieReviewService.deleteMovieReviewForCurrentUser({
        userID,
        reviewID,
    });

    return res
        .status(200)
        .json({message: "Movie Review deleted."});
}