/**
 * @fileoverview Frontend repository function for fetching Theatre Details view data.
 */

import {
    GetFetchTheatreDetailsViewDataConfig, GetFetchTheatreShowingListViewDataConfig
} from "@/domains/theatres/_feat/admin-view-data/repository/repository.types.ts";
import {FetchRequestReturns} from "@/shared/_types/request/FetchRequestReturns.ts";
import {TheatreDetailsViewData} from "@/domains/theatres/_feat/admin-view-data/schema/TheatreDetailsViewDataSchema.ts";
import {buildURL} from "@/shared/_feat/fetch-api";
import {TheatreAdminViewDataBaseURL} from "@/domains/theatres/_feat/admin-view-data/repository/baseURL.ts";
import {handleFetchOperation} from "@/shared/_feat/use-fetch-api/handleFetchOperation.ts";
import {
    TheatreShowingListViewData
} from "@/domains/theatres/_feat/admin-view-data/schema/TheatreShowingListViewDataSchema.ts";

/**
 * Fetches the complete dataset required for the Theatre Details admin dashboard.
 */
export function getFetchTheatreDetailsViewData(
    {slug, queries}: GetFetchTheatreDetailsViewDataConfig
): Promise<FetchRequestReturns<TheatreDetailsViewData>> {
    const url = buildURL({
        baseURL: TheatreAdminViewDataBaseURL,
        path: `/item/${slug}/details`,
        queries,
    });

    return handleFetchOperation({url: url, method: "GET"});
}

export function getFetchTheatreShowingListViewData(
    {slug, queries}: GetFetchTheatreShowingListViewDataConfig
): Promise<FetchRequestReturns<TheatreShowingListViewData>> {
    const url = buildURL({
        baseURL: TheatreAdminViewDataBaseURL,
        path: `/item/${slug}/showings/list`,
        queries,
    });

    return handleFetchOperation({url: url, method: "GET"});
}