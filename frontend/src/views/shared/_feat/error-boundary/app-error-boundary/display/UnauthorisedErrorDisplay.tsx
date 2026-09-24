/**
 * @fileoverview Display component for rendering unauthorised access errors.
 */

import {ErrorHandlerDisplayProps} from "@/shared/_types/error/ErrorHandlerProps.ts";
import {Logger} from "@/shared/_feat/logger/Logger.ts";
import {buildContext} from "@/shared/_feat/logger-builders/buildLoggerContext.ts";
import {cn} from "@/shared/_feat";
import {ShieldAlert} from "lucide-react";
import {UnauthorisedError} from "@noovies-tickets/common";
import {ReactElement} from "react";

/** Renders a visual representation of an UnauthorisedError. */
export function UnauthorisedErrorDisplay(
    {error, className}: ErrorHandlerDisplayProps<UnauthorisedError>
): ReactElement {
    const {message, redirectPath, source} = error;

    Logger.log({
        type: "ERROR",
        msg: "Unauthorised Error.",
        context: buildContext([
            {key: "error", value: error},
            {key: "errorMessage", value: message},
            {key: "redirectPath", value: redirectPath},
            {key: "source", value: source},
        ]),
    });

    return (
        <div className={cn("h-full flex flex-col justify-center items-center space-y-4", className)}>
            <ShieldAlert size={30}/>

            <div className="space-y-2 text-center">
                <h2 className="section-title italic">Unauthorised</h2>
                <span className="secondary-text text-sm">{message ?? "You are not authorised to do this."}</span>
            </div>
        </div>
    );
}
