/**
 * @fileoverview API function for refreshing user authentication session tokens.
 */

import {buildURL} from "@/common/_feat/fetch-api/buildURL";
import {handleFetchOperation} from "@/common/_feat/use-fetch-api/handleFetchOperation";
import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns";
import {AuthBaseURL} from "@/domains/auth/_feat/common/baseURL.ts";
import {User} from "@/domains/users/_schema/user/UserSchema.ts";

/** Sends a request to rotate and refresh the active authentication token. */
export function postRefreshAuthentication(): Promise<FetchRequestReturns<User>> {
    const url = buildURL({baseURL: AuthBaseURL, path: "/refresh"});
    return handleFetchOperation({url, method: "POST"});
}