/**
 * @fileoverview Route guard component that restricts access to authenticated users with admin privileges.
 */

import {ReactNode, useEffect} from "react";
import {toast} from "react-toastify";
import {Navigate} from "react-router-dom";
import {useAuthContext} from "@/domains/authentication/_feat/auth-context/useAuthContext.ts";
import {useSetRedirectPath} from "@/domains/authentication/_feat/manage-auth-user-data/useSetRedirectPath";

/** Props for the RequireAdmin component. */
type RequireProps = {
    children: ReactNode;
};

/**
 * Route boundary that restricts access to admin users, redirecting unauthenticated users to login and non-admin users to the home page.
 */
export function RequireAdmin(
    {children}: RequireProps
): ReactNode {
    const {user, isAdmin} = useAuthContext();
    const setPath = useSetRedirectPath();

    useEffect(() => {
        if (!user) {
            setPath();
            toast.error("Authentication required. Please login in.");
        } else if (!isAdmin) {
            toast.error("Forbidden.");
        }
    }, [user, isAdmin, setPath]);

    if (!user) return <Navigate to="/auth/login"/>;
    if (!isAdmin) return <Navigate to="/"/>;

    return (
        children
    );
}