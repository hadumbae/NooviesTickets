/**
 * @fileoverview Utility function for revoking user sessions via the logout API endpoint.
 */

import {buildURL} from "@/shared/_feat/fetch-api/buildURL";
import {handleFetchOperation} from "@/shared/_feat/use-fetch-api/handleFetchOperation";
import {FetchRequestReturns} from "@/shared/_types/request/FetchRequestReturns";
import {AuthBaseURL} from "@/domains/authentication/_feat/common/baseURL.ts";

/** Sends a request to log out the current user and invalidate their session. */
export function postLogoutUser(): Promise<FetchRequestReturns> {
    const url = buildURL({baseURL: AuthBaseURL, path: "/logout"});
    return handleFetchOperation({url, method: "POST"});
}