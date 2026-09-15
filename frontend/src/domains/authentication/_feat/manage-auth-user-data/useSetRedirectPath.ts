/**
 * @fileoverview Hook for saving the current route location to session storage for post-authentication redirection.
 */

import {useLocation} from "react-router-dom";

/** Custom hook that returns a function to persist the current location path to session storage. */
export function useSetRedirectPath(): () => string {
    const {pathname, search, hash} = useLocation();
    const path = `${pathname}${search}${hash}`;

    return () => {
        sessionStorage.setItem("redirectPath", path);
        return path;
    }
}