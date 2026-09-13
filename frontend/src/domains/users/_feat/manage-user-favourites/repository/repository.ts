/**
 * @fileoverview Repository for managing user favourite movie data and interactions.
 */

import {handleFetchOperation} from "@/common/_feat/use-fetch-api/handleFetchOperation.ts";
import {ObjectIdString} from "@noovies-tickets/common";
import {PaginationOptions} from "@noovies-tickets/common";
import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns.ts";
import {buildURL} from "@/common/_feat/fetch-api";
import {IsFavouriteMovieMetadata} from "@/domains/users/_feat/manage-user-favourites/schema";
import {ManageUserFavouritesBaseURL} from "@/domains/users/_feat/manage-user-favourites/repository/baseURL";
import {PaginatedItems} from "@/common/_types";
import {MovieDetails} from "@/domains/movies/_schema/movie";

/** Checks if a specific movie is in the current user's favourites list. */
export async function getCheckIsFavouriteMovie(
    movieID: ObjectIdString
): Promise<FetchRequestReturns<IsFavouriteMovieMetadata>> {
    const url = buildURL({
        baseURL: ManageUserFavouritesBaseURL,
        path: `/favourites/check/movie/${movieID}`,
    });

    return handleFetchOperation({url, method: "GET"});
}

/** Retrieves a paginated list of movies favourited by the current user. */
export async function getUserFavourites(
    params: PaginationOptions
): Promise<FetchRequestReturns<PaginatedItems<MovieDetails>>> {
    const url = buildURL({
        baseURL: ManageUserFavouritesBaseURL,
        path: "/favourites/user",
        queries: params,
    });

    return handleFetchOperation({url, method: "GET"});
}

/** Toggles the favourite status of a movie for the current user. */
export async function patchToggleUserFavouriteMovie(
    movieID: ObjectIdString
): Promise<FetchRequestReturns<unknown>> {
    const url = buildURL({
        baseURL: ManageUserFavouritesBaseURL,
        path: "/favourites/toggle",
    });

    return handleFetchOperation({url, method: "PATCH", data: {movieID}});
}