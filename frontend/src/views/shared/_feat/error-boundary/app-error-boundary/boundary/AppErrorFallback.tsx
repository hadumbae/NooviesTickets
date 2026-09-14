/**
 * @fileoverview Fallback component that dispatches errors to specific display components based on error type.
 */

import {FallbackProps} from "react-error-boundary";
import {AppErrorDisplay} from "@/views/shared/_feat/error-boundary/app-error-boundary/display/AppErrorDisplay.tsx";
import {
    QueryErrorHandler
} from "@/views/shared/_feat/error-boundary/query-error-fallback/boundary/QueryErrorHandler.tsx";
import {RouteError} from "@/shared/_err/RouteError.ts";
import {RouteErrorDisplay} from "@/views/shared/_feat/error-boundary/app-error-boundary/display/RouteErrorDisplay.tsx";
import {NetworkError} from "@/shared/_err/NetworkError.ts";
import HttpResponseError from "@/shared/_err/HttpResponseError.ts";
import {ReactElement} from "react";

/** Props for the AppErrorFallback component. */
type HandlerProps = FallbackProps & { className?: string };

/**
 * Determines the appropriate error UI to render based on the instance type of the caught error.
 */
export function AppErrorFallback(
    {error, className}: HandlerProps
): ReactElement {
    if (error instanceof NetworkError || error instanceof HttpResponseError) {
        return (
            <QueryErrorHandler error={error} className={className}/>
        );
    }

    if (error instanceof RouteError) {
        return (
            <RouteErrorDisplay error={error} className={className}/>
        );
    }

    return (
        <AppErrorDisplay error={error} className={className}/>
    );
}
