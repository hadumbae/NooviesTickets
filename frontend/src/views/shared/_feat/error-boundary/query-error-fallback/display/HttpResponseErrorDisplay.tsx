/**
 * @fileoverview Display component for HTTP response errors within the query error boundary fallback.
 */

import {Logger} from "@/shared/_feat/logger/Logger.ts";
import {buildContext} from "@/shared/_feat/logger-builders/buildLoggerContext.ts";
import {Network} from "lucide-react";
import {cn} from "@/shared/_feat";
import HttpResponseError from "@/shared/_err/HttpResponseError.ts";
import {ErrorHandlerDisplayProps} from "@/shared/_types/error/ErrorHandlerProps.ts";
import {HttpStatusOverrideText} from "@/shared/_types/error/HttpErrorTypes.ts";
import {ReactElement} from "react";

type DisplayProps = ErrorHandlerDisplayProps<HttpResponseError> & {
    statusTextOverride?: HttpStatusOverrideText;
};

/** Renders a visual representation of an HTTP error including status code and optional message overrides. */
export function HttpResponseErrorDisplay(
    {error, className, statusTextOverride}: DisplayProps
): ReactElement {
    const {message, status, statusText, url, model, payload} = error;

    const errorMessage = message ? message : undefined;
    const statusMessage = statusTextOverride?.[status] || statusText;

    Logger.error({
        error,
        type: "ERROR",
        msg: `HTTP ${status}: ${statusText}`,
        context: buildContext([
            {key: "url", value: url},
            {key: "model", value: model},
            {key: "status", value: status},
            {key: "payload", value: payload},
            {key: "message", value: errorMessage},
            {key: "statusText", value: statusMessage},
        ]),
    });

    return (
        <div className={cn("h-full flex flex-col justify-center items-center space-y-4", className)}>
            <Network size={30}/>

            <div className="space-y-2 text-center">
                <h2 className="section-title italic">HTTP {status}</h2>
                <span className="secondary-text text-sm">{errorMessage ?? statusMessage}</span>
            </div>
        </div>
    );
}
