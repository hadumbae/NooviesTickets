/**
 * @fileoverview API repository for managing movie reviews belonging to the current user.
 */

import {FetchRequestReturns} from "@/shared/_types/request/FetchRequestReturns.ts";
import {handleFetchOperation} from "@/shared/_feat/use-fetch-api/handleFetchOperation.ts";
import {ObjectIdString} from "@noovies-tickets/common";
import {buildURL} from "@/shared/_feat/fetch-api";
import {ManageMyReviewsBaseURL} from "@/domains/movie-reviews/_feat/my-reviews/repository/baseURL.ts";
import type {
    CreateCurrentUserMovieReviewConfig,
    CurrentUserMovieReviewsConfig,
    UpdateCurrentUserMovieReviewConfig
} from "@/domains/movie-reviews/_feat/my-reviews/repository/repository.types.ts";

/** Retrieves paginated movie reviews created by the authenticated user. */
export function getFetchMovieReviewsByCurrentUser<TData = unknown>(
    {page, perPage, config}: CurrentUserMovieReviewsConfig
): Promise<FetchRequestReturns<TData>> {
    const url = buildURL({
        baseURL: ManageMyReviewsBaseURL,
        path: "/current/fetch",
        queries: {page, perPage, ...config},
    });

    return handleFetchOperation({url, method: "GET"})
}

/** Creates a new movie review for the authenticated user. */
export function postCreateMovieReviewForCurrentUser<TData = unknown>(
    {data, config}: CreateCurrentUserMovieReviewConfig
): Promise<FetchRequestReturns<TData>> {
    const url = buildURL({
        baseURL: ManageMyReviewsBaseURL,
        path: "/current/create",
        queries: config
    });

    return handleFetchOperation({url, method: "POST", data})
}

/** Updates an existing movie review owned by the authenticated user. */
export function patchUpdateMovieReviewForCurrentUser<TData = unknown>(
    {reviewID, data, config}: UpdateCurrentUserMovieReviewConfig
): Promise<FetchRequestReturns<TData>> {
    const url = buildURL({
        baseURL: ManageMyReviewsBaseURL,
        path: `/current/update/${reviewID}`,
        queries: config,
    });

    return handleFetchOperation({url, method: "PATCH", data});
}

/** Deletes a specific movie review owned by the authenticated user. */
export function deleteRemoveMovieReviewForCurrentUser<TData = unknown>(
    reviewID: ObjectIdString,
): Promise<FetchRequestReturns<TData>> {
    const url = buildURL({
        baseURL: ManageMyReviewsBaseURL,
        path: `/current/delete/${reviewID}`,
    });

    return handleFetchOperation({url, method: "DELETE"});
}