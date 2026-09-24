/**
 * @fileoverview Utility for executing network requests with integrated logging and error handling.
 */

import {Logger} from "@/shared/_feat/logger/Logger.ts";
import {RequestMethod} from "@/shared/_types/request/RequestMethod.ts";
import {HttpResponseError} from "@noovies-tickets/common";

type FetchParams = {
    url: string;
    method: RequestMethod;
    headers: HeadersInit;
    body?: BodyInit;
    signal?: AbortSignal | null;
    source?: string;
};

/** Executes an HTTP request using the fetch API and logs the operation. */
export async function executeFetch(
    {url, method, headers, body, signal, source}: FetchParams
): Promise<Response> {
    try {
        return fetch(url, {credentials: "include", method, headers, body, signal});
    } catch (error: unknown) {
        const message = error instanceof Error
            ? `Network Error Or CORS Issue: ${error.message}`
            : "Unknown Error Occurred";

        error instanceof Error
            ? Logger.error({msg: "Fetch request failed.", type: "ERROR", context: {source}, error})
            : Logger.error({msg: "Fetch request failed.", type: "ERROR", context: {source, error}});

        throw new HttpResponseError({errorCode: "ERR_NETWORK", url, message});
    }
}
