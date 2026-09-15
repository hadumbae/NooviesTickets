/**
 * @fileoverview Defines the routing configuration for authentication-related pages.
 */

import {ErrorPage} from "@/views/shared/_pages/error/ErrorPage.tsx";
import {BaseLayout} from "@/views/shared/_layout/base-layout/BaseLayout.tsx";

/** Route definitions for registration, login, and logout views. */
export const AuthRoutes = [
    {
        path: "/auth",
        element: <BaseLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/auth/register",
                lazy: async () => {
                    const {AuthRegisterPage} = await import("@/views/shared/_pages/auth/register/page.tsx");
                    return {Component: AuthRegisterPage};
                },
            },
            {
                path: "/auth/login",
                lazy: async () => {
                    const {AuthLoginPage} = await import("@/views/shared/_pages/auth/login/page.tsx");
                    return {Component: AuthLoginPage};
                },
            },
            {
                path: "/auth/logout",
                lazy: async () => {
                    const {AuthLogoutPage} = await import("@/views/shared/_pages/auth/logout/page.tsx");
                    return {Component: AuthLogoutPage};
                },
            },
        ]
    }
];
