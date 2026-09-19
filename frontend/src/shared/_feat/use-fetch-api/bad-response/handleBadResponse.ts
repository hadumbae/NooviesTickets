/**
 * @fileoverview Utility for handling and logging unsuccessful HTTP responses.
 */

import {Logger} from "@/shared/_feat/logger/Logger.ts";
import {buildContext} from "@/shared/_feat/logger-builders/buildLoggerContext.ts";
import HttpResponseError from "@/shared/_err/HttpResponseError.ts";
import {handle422Response} from "@/shared/_feat/use-fetch-api/bad-response/handle422Response.ts";
import {parseJSON} from "@noovies-tickets/common";

type HandlerParams = {
    response: Response;
    rawPayload: string;
    source: string;
    message?: string;
};

/** Processes a failed HTTP response by logging the error and throwing an HttpResponseError. */
export function handleBadResponse(
    {response, source, rawPayload, message}: HandlerParams
): never {
    const {url, headers, status, statusText} = response;

    const payload = parseJSON({
        raw: rawPayload,
        statusCode: status,
        message: "Invalid Response Body.",
    });

    if (status === 422) {
        handle422Response({source, url, headers, status, statusText, payload});
    }

    Logger.warn({
        msg: `HTTP ERROR: ${status}`,
        type: "ERROR",
        context: buildContext([
            {key: "source", value: source},
            {key: "payload", value: payload},
        ]),
    });

    throw new HttpResponseError({
        url,
        headers,
        status,
        statusText,
        message,
        payload,
    });
}
