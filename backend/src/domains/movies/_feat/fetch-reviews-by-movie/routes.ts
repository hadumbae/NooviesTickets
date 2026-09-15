/**
 * @file Movie review browse route registrations.
 */

import { Router } from "express";
import asyncHandler from "@/shared/_utils/handlers/asyncHandler";
import {isAuth} from "@/domains/authentication/_middleware/isAuth";
import * as MovieBrowseController from "@/domains/movies/_feat/fetch-reviews-by-movie/controller";
import {validateRequestConfig} from "@/shared/_utils/schema/validators/validateRequestConfig";
import {
    FeaturedMovieReviewsRouteConfigSchema,
    MovieReviewsPaginatedRouteConfigSchema
} from "@/domains/movies/_feat/fetch-reviews-by-movie/schema";

const router = Router();

/**
 * Route for paginated movie reviews.
 */
router.get(
    "/item/:_id/reviews",
    [isAuth, validateRequestConfig({schema: MovieReviewsPaginatedRouteConfigSchema})],
    asyncHandler(MovieBrowseController.getReviewsByMovie),
);

/**
 * Route for paginated reviews with aggregate stats and user review.
 */
router.get(
    "/item/:_id/reviews/details",
    [isAuth, validateRequestConfig({schema: MovieReviewsPaginatedRouteConfigSchema})],
    asyncHandler(MovieBrowseController.getReviewDetailsByMovie),
);

/**
 * Route for featured movie reviews.
 */
router.get(
    "/item/:_id/reviews/featured",
    [isAuth, validateRequestConfig({schema: FeaturedMovieReviewsRouteConfigSchema})],
    asyncHandler(MovieBrowseController.getFeaturedReviewsByMovie),
);

export {
    router as MovieClientReviewsRoutes,
};