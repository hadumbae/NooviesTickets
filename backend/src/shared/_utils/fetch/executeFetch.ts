/**
 * @file Low-level fetch execution utility with normalized error handling.
 * @filename executeFetch.ts
 */

import {HttpResponseError, type URLString} from "@noovies-tickets/common";
import type {RequestMethod} from "@/shared/_types/requests/RequestMethods";

/**
 * Parameters for {@link executeFetch}.
 */
type FetchParams = {
    /** Request URL. */
    url: URLString;

    /** HTTP method used for the request. */
    method: RequestMethod;

    /** Optional request headers. */
    headers?: HeadersInit;

    /** Optional request body. */
    body?: BodyInit;

    /** Optional abort signal for request cancellation. */
    signal?: AbortSignal | null;
};

/**
 * Executes a `fetch` request and normalizes thrown errors.
 *
 * @param params - Fetch execution parameters.
 * @returns The raw `Response` from the fetch request.
 * @throws {HttpResponseError} When a network, system, or unknown error occurs.
 */
export async function executeFetch(
    {url, method, headers, body, signal}: FetchParams,
): Promise<Response> {
    try {
        return fetch(url, {method, headers, body, signal});
    } catch (error: unknown) {
        if (error instanceof TypeError) {
            throw new HttpResponseError({
                errorCode: "ERR_NETWORK",
                url,
                message: "Network Error Or CORS Issue",
            });
        } else if (error instanceof Error) {
            throw new HttpResponseError({
                errorCode: "ERR_NETWORK",
                url,
                message: `System Error: ${error.message}`,
            });
        } else {
            throw new HttpResponseError({
                errorCode: "ERR_NETWORK",
                url,
                message: `Unknown Error Occurred`,
            });
        }
    }
}