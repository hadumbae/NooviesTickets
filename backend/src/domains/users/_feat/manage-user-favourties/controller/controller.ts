/**
 * @file Handlers for user favourite movie endpoints.
 * UserFavouriteController.ts
 */

import type {Request, Response} from 'express';
import type {ControllerAsyncFunc} from "@/shared/_types/controllers/ControllerTypes";
import {fetchRequestUserId} from "@/shared/_utils/request/fetchRequestUserId";
import * as UserFavouriteService from "@/domains/users/_feat/manage-user-favourties/service/service";
import type {UserFavouriteMovieInput} from "@/domains/users/validation/submit/UserFavouriteMovieInputSchema";
import isValidObjectId from "@/shared/_utils/mongoose/isValidObjectId.js";
import type {UserFavouriteMoviesRouteConfig} from "@/domains/users/_feat/manage-user-favourties/schema";

/** Returns paginated favourites for the current user. */
export const getFavouriteMovies: ControllerAsyncFunc = async (
    req: Request, res: Response
): Promise<Response> => {
    const userID = fetchRequestUserId(req);
    const {page, perPage} = req.parsedConfig as UserFavouriteMoviesRouteConfig;

    const paginatedMovies = await UserFavouriteService.fetchUserFavourites({
        userID,
        page,
        perPage,
    });

    return res.status(200).json(paginatedMovies);
}

/** Indicates whether a movie is favourited by the current user. */
export const getIsFavouriteMovie: ControllerAsyncFunc = async (
    req: Request, res: Response
): Promise<Response> => {
    const userID = fetchRequestUserId(req);
    const {movieID} = req.params;

    const mID = isValidObjectId(movieID);
    const isFavRes = await UserFavouriteService.isUserFavouriteMovie({userID, movieID: mID});

    return res.status(200).json(isFavRes);
}

/** Toggles the current user's favourite state for a movie. */
export const patchToggleUserMovieFavourite: ControllerAsyncFunc = async (
    req: Request, res: Response
): Promise<Response> => {
    const userID = fetchRequestUserId(req);
    const {movieID} = req.validatedBody as UserFavouriteMovieInput;

    const {added, message} = await UserFavouriteService.toggleCurrentUserFavouriteMovie({
        userID,
        movieID,
    });

    return res
        .status(200)
        .json({added, message});
}