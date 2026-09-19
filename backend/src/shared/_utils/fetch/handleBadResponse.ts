/**
 * @fileoverview Handler function for processing unsuccessful HTTP responses by parsing error details and throwing an HttpResponseError.
 */

import {parseJSON, type URLString} from "@noovies-tickets/common";
import {HttpResponseError} from "../../_errors/HttpResponseError.js";

type HandlerParams = {
    url: URLString;
    status: number;
    statusText: string;
    raw: string;
}

/** Processes a failed HTTP response by parsing its body and throwing a structured error. */
export async function handleBadResponse(
    {url, raw, status, statusText}: HandlerParams
): Promise<never> {
    const responseData = parseJSON({raw, statusCode: status});

    throw new HttpResponseError({
        url,
        statusText,
        statusCode: status,
        body: responseData,
    });
}