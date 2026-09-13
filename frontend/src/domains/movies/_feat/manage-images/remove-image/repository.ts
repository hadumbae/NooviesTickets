/**
 * @fileoverview API functions for removing movie poster and banner images.
 */

import {ObjectIdString} from "@noovies-tickets/common";
import {FetchRequestReturns} from "@/common/_types";
import {buildURL, handleFetchOperation} from "@/common/_feat";
import {ManageMovieImagesBaseURL} from "@/domains/movies/_feat/manage-images/baseURL.ts";
import {Movie} from "@/domains/movies/_schema/movie/MovieSchema.ts";

/** Parameters required to remove a movie image asset. */
export type DeleteMovieImageRouteConfig = {
    movieID: ObjectIdString;
}

/** Sends an API request to remove the poster image for a specified movie. */
export function patchRemovePosterImage(
    {movieID}: DeleteMovieImageRouteConfig
): Promise<FetchRequestReturns<Movie>> {
    const url = buildURL({
        baseURL: ManageMovieImagesBaseURL,
        path: `/item/${movieID}/poster-image/remove`
    });

    return handleFetchOperation({url, method: "PATCH"});
}

/** Sends an API request to remove the banner image for a specified movie. */
export function patchRemoveBannerImage(
    {movieID}: DeleteMovieImageRouteConfig
): Promise<FetchRequestReturns<Movie>> {
    const url = buildURL({
        baseURL: ManageMovieImagesBaseURL,
        path: `/item/${movieID}/banner-image/remove`
    });

    return handleFetchOperation({url, method: "PATCH"});
}