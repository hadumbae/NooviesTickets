/**
 * @fileoverview Repository for fetching genre-related client view data.
 */

import {handleFetchOperation} from "@/common/_feat/use-fetch-api/handleFetchOperation.ts";
import {GenreClientViewDataBaseURL} from "@/domains/genres/_feat/client-view-data/repository/baseURL.ts";
import {FetchGenreWithMoviesConfig} from "@/domains/genres/_feat/client-view-data/repository/repository.types.ts";
import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns.ts";
import {BrowseGenreWithMoviesViewData} from "@/domains/genres/_feat/client-view-data/schema/schemas.ts";
import {buildURL} from "@/common/_feat/fetch-api";

/** Fetches a specific genre's metadata along with a paginated list of associated movies. */
export function getFetchGenreWithMovies(
    {slug, moviePagination}: FetchGenreWithMoviesConfig
): Promise<FetchRequestReturns<BrowseGenreWithMoviesViewData>> {
    const url = buildURL({
        baseURL: GenreClientViewDataBaseURL,
        path: `/item/${slug}/with-movies`,
        queries: moviePagination,
    });

    return handleFetchOperation({
        url,
        method: "GET"
    });
}