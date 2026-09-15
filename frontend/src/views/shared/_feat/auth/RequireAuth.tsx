/**
 * @fileoverview Route guard component that restricts access to authenticated users.
 */

import {ReactNode} from "react";
import {Navigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useAuthContext} from "@/domains/authentication/_feat/auth-context/useAuthContext.ts";
import {useSetRedirectPath} from "@/domains/authentication/_feat/manage-auth-user-data/useSetRedirectPath.ts";

/** Props for the RequireAuth component. */
type RequireProps = {
    children: ReactNode;
};

/**
 * Route boundary that redirects unauthenticated users to the login page and saves their target destination.
 */
export function RequireAuth(
    {children}: RequireProps
): ReactNode {
    const {user} = useAuthContext();
    const setPath = useSetRedirectPath();

    if (!user) {
        setPath();
        toast.error("Authentication required. Please login in.");

        return (
            <Navigate to="/auth/login"/>
        );
    }

    return (
        children
    );
}