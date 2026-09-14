/**
 * @fileoverview Custom hook for fetching client homepage view data with optional query parameters.
 */

import {
    ClientHomepageViewRouteConfig
} from "@/domains/pages/_feat/client-view-data/client-homepage-data/ClientHomepageViewRouteConfigSchema.ts";
import {buildURL, handleFetchOperation} from "@/shared/_feat";
import {ClientHomepageBaseURL} from "@/domains/pages/_feat/client-view-data/baseURL.ts";
import {FetchRequestReturns} from "@/shared/_types";
import {
    ClientHomepageViewData
} from "@/domains/pages/_feat/client-view-data/client-homepage-data/ClientHomepageViewDataSchema.ts";

/** Configuration options for fetching client homepage view data. */
type FetchConfig = {
    queries?: ClientHomepageViewRouteConfig;
}

/** Fetches client homepage view data using configured query parameters. */
export async function getFetchClientHomepageViewData(
    {queries}: FetchConfig = {}
): Promise<FetchRequestReturns<ClientHomepageViewData>> {
    const url = buildURL({
        baseURL: ClientHomepageBaseURL,
        path: "/home-page-data",
        queries,
    });

    return handleFetchOperation({url, method: "GET"});
}