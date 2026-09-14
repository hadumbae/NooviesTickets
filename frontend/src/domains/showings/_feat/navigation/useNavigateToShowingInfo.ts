/**
 * @fileoverview Hook for navigating to the showing's client-side view with logging.
 */

import {
    LoggingMessageParams,
    useLoggedNavigate
} from "@/shared/_feat/navigation/useLoggedNavigate.ts";
import {NavigateOptions} from "react-router-dom";
import {SlugString} from "@noovies-tickets/common";

/** Configuration for the showing navigation action. */
type NavConfig = LoggingMessageParams & {
    slug: SlugString;
    options?: NavigateOptions,
}

/** Returns a function to navigate to a specific showing's client-side view. */
export function useNavigateToShowingInfo() {
    const navigate = useLoggedNavigate();

    return ({slug, options, ...config}: NavConfig) => {
        navigate({
            to: `/browse/showings/${slug}`,
            options,
            ...config,
        });
    };
}
