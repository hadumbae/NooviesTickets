/**
 * @fileoverview API functions for uploading and updating movie poster and banner images.
 */

import {ObjectIdString} from "@noovies-tickets/common";
import {FetchRequestReturns} from "@/shared/_types/request/FetchRequestReturns";
import {buildURL} from "@/shared/_feat/fetch-api/buildURL";
import {ManageMovieImagesBaseURL} from "@/domains/movies/_feat/manage-images/baseURL";
import {handleFetchOperation} from "@/shared/_feat/use-fetch-api/handleFetchOperation";
import {Movie} from "@noovies-tickets/common";

/** Parameters required to upload a movie poster or banner image. */
export type UploadMovieImageRouteConfig = {
    movieID: ObjectIdString;
    data: FormData;
}

function createMovieImageUploadRoute(
    key: "poster" | "banner",
): (params: UploadMovieImageRouteConfig) => Promise<FetchRequestReturns<Movie>> {
    return async (
        {movieID, data}: UploadMovieImageRouteConfig
    ): Promise<FetchRequestReturns<Movie>> => {
        const url = buildURL({
            baseURL: ManageMovieImagesBaseURL,
            path: `/item/${movieID}/${key}-image/update`
        });

        return handleFetchOperation({url, method: "PATCH", data});
    }
}

/** Uploads or updates the poster image for a movie. */
export const patchUploadMoviePosterImage = createMovieImageUploadRoute("poster");

/** Uploads or updates the banner image for a movie. */
export const patchUploadMovieBannerImage = createMovieImageUploadRoute("banner");