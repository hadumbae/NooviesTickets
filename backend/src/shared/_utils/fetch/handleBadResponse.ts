/**
 * @fileoverview Handler function for processing unsuccessful HTTP responses by parsing error details and throwing an HttpResponseError.
 */

import {deriveHttpResponseErrorCode, HttpResponseError, parseJSON, type URLString} from "@noovies-tickets/common";

type HandlerParams = {
    url: URLString;
    status: number;
    raw: string;
}

/** Processes a failed HTTP response by parsing its body and throwing a structured error. */
export async function handleBadResponse(
    {url, raw, status}: HandlerParams
): Promise<never> {
    parseJSON({raw, statusCode: status});

    throw new HttpResponseError({
        errorCode: deriveHttpResponseErrorCode(status),
        url,
        statusCode: status,
    });
}