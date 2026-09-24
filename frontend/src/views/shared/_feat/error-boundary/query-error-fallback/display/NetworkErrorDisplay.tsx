/**
 * @fileoverview Component for displaying and logging network-related errors within a query error boundary.
 */

import {HttpResponseError} from "@noovies-tickets/common";
import {Logger} from "@/shared/_feat/logger/Logger.ts";
import {buildContext} from "@/shared/_feat/logger-builders/buildLoggerContext.ts";
import {Network} from "lucide-react";
import {cn} from "@/shared/_feat";
import {ErrorHandlerDisplayProps} from "@/shared/_types/error/ErrorHandlerProps.ts";
import { ReactElement } from "react";

/**
 * Renders a visual representation of a network error and logs the error details to the logger.
 */
export function NetworkErrorDisplay(
    {error, className}: ErrorHandlerDisplayProps<HttpResponseError>
): ReactElement {
    const {url, message: errorMessage} = error;

    Logger.error({
        error,
        type: "ERROR",
        msg: "Network Error",
        context: buildContext([
            {key: "url", value: url},
            {key: "message", value: errorMessage},
        ]),
    });

    return (
        <div className={cn("h-full flex justify-center items-center space-y-4", className)}>
            <Network size={30}/>

            <div className="space-y-2 text-center">
                <h2 className="section-title italic">Network Error</h2>
                <span className="secondary-title text-sm">{errorMessage ?? "Oops. Something went wrong. Please try again."}</span>
            </div>
        </div>
    );
}
