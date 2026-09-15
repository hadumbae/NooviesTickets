/**
 * @fileoverview API mutation function for authenticating users via the login endpoint.
 */

import {buildURL} from "@/shared/_feat/fetch-api/buildURL";
import {handleFetchOperation} from "@/shared/_feat/use-fetch-api/handleFetchOperation";
import {FetchRequestReturns} from "@/shared/_types/request/FetchRequestReturns";
import {AuthBaseURL} from "@/domains/authentication/_feat/common/baseURL.ts";
import {AuthLoginFormData} from "@/domains/authentication/_feat/user-login/AuthLoginFormSchema.ts";

/** Sends user credentials to the authentication API to initialize a new session. */
export function postLoginUser(data: AuthLoginFormData): Promise<FetchRequestReturns> {
    const url = buildURL({baseURL: AuthBaseURL, path: "/login"});
    return handleFetchOperation({url, method: "POST", data});
}
