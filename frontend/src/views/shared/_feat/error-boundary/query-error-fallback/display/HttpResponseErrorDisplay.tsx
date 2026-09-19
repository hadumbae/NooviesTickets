/**
 * @fileoverview Display component for HTTP response errors within the query error boundary fallback.
 */

import {Logger} from "@/shared/_feat/logger/Logger.ts";
import {buildContext} from "@/shared/_feat/logger-builders/buildLoggerContext.ts";
import {Network} from "lucide-react";
import {cn} from "@/shared/_feat";
import {HttpResponseError} from "@noovies-tickets/common";
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
    const {message, statusCode, url, errorCode} = error;

    const errorMessage = message ? message : undefined;
    const statusMessage = statusTextOverride?.[statusCode];

    Logger.error({
        error,
        type: "ERROR",
        msg: `HTTP ${statusCode}: ${errorCode}`,
        context: buildContext([
            {key: "url", value: url},
            {key: "errorCode", value: errorCode},
            {key: "statusCode", value: statusCode},
            {key: "message", value: errorMessage},
        ]),
    });

    return (
        <div className={cn("h-full flex flex-col justify-center items-center space-y-4", className)}>
            <Network size={30}/>

            <div className="space-y-2 text-center">
                <h2 className="section-title italic">HTTP {statusCode}</h2>
                <span className="secondary-text text-sm">
                    {errorMessage ?? statusMessage ?? "Oops. Something went wrong. Please try again."}
                </span>
            </div>
        </div>
    );
}
