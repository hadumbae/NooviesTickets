/**
 * @file Authenticated routes for user favourite movie actions.
 * UserProfileRoutes.ts
 */

import {Router} from 'express';
import {isAuth} from "@/domains/authentication/_middleware/isAuth.js";
import asyncHandler from "@/shared/_utils/handlers/asyncHandler.js";
import * as UserFavouriteController from "@/domains/users/_feat/manage-user-favourties/controller/controller";
import validateZodSchema from "@/shared/_utils/schema/validators/validateZodSchema.js";
import {validateRequestConfig} from "@/shared/_utils/schema/validators/validateRequestConfig";
import {UserFavouriteMoviesRouteConfigSchema} from "@/domains/users/_feat/manage-user-favourties/schema";
import {UserFavouriteMovieInputSchema} from "@/domains/users/validation/submit/UserFavouriteMovieInputSchema";

const router = Router();

/** Lists favourites for the current user. */
router.get(
    "/favourites/user",
    [isAuth, validateRequestConfig({schema: UserFavouriteMoviesRouteConfigSchema})],
    asyncHandler(UserFavouriteController.getFavouriteMovies)
);

/** Checks favourite status for a movie. */
router.get(
    "/favourites/check/movie/:movieID",
    [isAuth],
    asyncHandler(UserFavouriteController.getIsFavouriteMovie)
);

/** Toggles favourite state for a movie. */
router.patch(
    "/favourites/toggle",
    [isAuth, validateZodSchema(UserFavouriteMovieInputSchema)],
    asyncHandler(UserFavouriteController.patchToggleUserMovieFavourite)
);

export {
    router as UserFavouritesRoutes,
}