/**
 * @fileoverview Repository for interacting with external third-party APIs and services.
 */

import {buildURL} from "@/common/_feat/fetch-api/buildURL.ts";
import {handleFetchOperation} from "@/common/_feat/use-fetch-api/handleFetchOperation.ts";
import {ExternalAPIBaseURL} from "@/common/_feat/external/repository/baseURL.ts";

/** Fetches geographical information based on the user's current IP address. */
export const fetchGeolocationByIP = () => {
    const url = buildURL({
        baseURL: ExternalAPIBaseURL,
        path: "/ip-geo/get-geolocation",
    });

    return handleFetchOperation({url, method: "GET"});
};