/**
 * @fileoverview Hook for handling HTTP response errors and managing unauthorised redirection.
 */

import HttpResponseError from "@/shared/_err/HttpResponseError.ts";
import {toast} from "react-toastify";
import {useEffect} from "react";
import {useLoggedNavigate} from "@/shared/_feat/navigation/useLoggedNavigate.ts";
import {useLocation} from "react-router-dom";
import {setRedirectPath} from "@/shared/_feat/navigation";

/** Hook that monitors for HttpResponseErrors and redirects to login on 401 status. */
export function useHttpResponseErrorHandler(error: unknown) {
    const navigate = useLoggedNavigate();
    const {pathname, search, hash} = useLocation();

    useEffect(() => {
        if (!(error instanceof HttpResponseError)) return;

        const {status} = error;

        if (status === 401) {
            const targetURL = new URL(`${pathname}${search}${hash}`);

            toast.error("Unauthorized!");
            setRedirectPath(targetURL);

            navigate({
                to: "/auth/login",
                message: "Unauthorized!",
                component: useHttpResponseErrorHandler.name,
            });
        }
    }, [error, pathname, search, hash, navigate]);
}