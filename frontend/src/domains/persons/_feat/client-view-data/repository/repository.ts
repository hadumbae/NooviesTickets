/**
 * @fileoverview Repository for fetching person-related view data for the client-side interface.
 */

import {FetchRequestReturns} from "@/shared/_types/request/FetchRequestReturns.ts";
import {buildURL} from "@/shared/_feat/fetch-api";
import {handleFetchOperation} from "@/shared/_feat/use-fetch-api/handleFetchOperation.ts";
import {PersonInfoViewData} from "@/domains/persons/_feat/client-view-data/person-info/dataSchema.ts";
import {PersonClientViewBaseURL} from "@/domains/persons/_feat/client-view-data/repository/baseURL.ts";
import {
    GetFetchBrowsePersonsViewDataConfig,
    GetFetchPersonInfoViewDataConfig,
} from "@/domains/persons/_feat/client-view-data/repository/repository.types.ts";
import {BrowsePersonsViewData} from "@/domains/persons/_feat/client-view-data/browse-persons/schema/dataSchema.ts";

/** Fetches a paginated list of persons for the browse view. */
export async function getFetchBrowsePersonsViewData(
    {page, perPage, queries}: GetFetchBrowsePersonsViewDataConfig
): Promise<FetchRequestReturns<BrowsePersonsViewData>> {
    const url = buildURL({
        baseURL: PersonClientViewBaseURL,
        path: "/browse",
        queries: {page, perPage, ...queries},
    });

    return handleFetchOperation({url, method: "GET"});
}

/** Fetches detailed information for a specific person based on their slug. */
export async function getFetchPersonInfoViewData(
    {slug, limit}: GetFetchPersonInfoViewDataConfig
): Promise<FetchRequestReturns<PersonInfoViewData>> {
    const url = buildURL({
        baseURL: PersonClientViewBaseURL,
        path: `/person/${slug}/info`,
        queries: {limit},
    });

    return handleFetchOperation({url, method: "GET"});
}