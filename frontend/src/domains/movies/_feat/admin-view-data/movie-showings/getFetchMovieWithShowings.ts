/**
 * @fileoverview Service function for fetching validated movie showings view data from the admin API.
 */

import {SlugString} from "@noovies-tickets/common";
import {FetchRequestReturns} from "@/shared/_types";
import {buildURL} from "@/shared/_feat/fetch-api/buildURL.ts";
import {handleFetchOperation} from "@/shared/_feat/use-fetch-api/handleFetchOperation.ts";
import {MovieAdminViewDataBaseURL} from "@/domains/movies/_feat/admin-view-data/baseURL.ts";
import {
    MovieShowingsViewData
} from "@/domains/movies/_feat/admin-view-data/movie-showings/MovieShowingsViewDataSchema.ts";

/** Props for the getFetchMovieWithShowings function. */
type FetchConfig = {
    slug: SlugString;
    page?: number;
    perPage?: number;
}

/** Fetches movie showings view data for the specified movie identifier. */
export function getFetchMovieWithShowings(
    {slug, page, perPage}: FetchConfig,
): Promise<FetchRequestReturns<MovieShowingsViewData>> {
    const url = buildURL({
        baseURL: MovieAdminViewDataBaseURL,
        path: `/item/${slug}/showings`,
        queries: {page, perPage},
    });

    return handleFetchOperation({method: "GET", url});
}