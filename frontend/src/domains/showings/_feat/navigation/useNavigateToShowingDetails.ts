/**
 * @fileoverview Hook for navigating to the showing details administration page.
 */

import {
    LoggingMessageParams,
    useLoggedNavigate
} from "@/common/_feat/navigation/useLoggedNavigate.ts";
import {NavigateOptions} from "react-router-dom";
import {ObjectIdString} from "@noovies-tickets/common";

/** Configuration for the showing details navigation hook. */
type NavConfig = LoggingMessageParams & {
    slug: ObjectIdString;
    options?: NavigateOptions,
}

/**
 * Returns a function that navigates to a specific showing's detail page with logging.
 */
export function useNavigateToShowingDetails() {
    const navigate = useLoggedNavigate();

    return ({slug, options, ...config}: NavConfig) => {
        navigate({to: `/admin/showings/get/${slug}`, options, ...config});
    };
}