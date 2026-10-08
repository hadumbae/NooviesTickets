/**
 * @fileoverview Route definitions for the user profile and account management section.
 *
 */

import {RouteObject} from "react-router-dom";
import {BaseLayout} from "@/views/shared/_layout/base-layout/BaseLayout.tsx";
import {ErrorPage} from "@/views/shared/_pages/error/ErrorPage.tsx";
import {RequireAuth} from "@/views/shared/_feat/auth/RequireAuth.tsx";
import {buildRouteParamLoader} from "@/shared/_loaders";
import {SlugRouteParamSchema} from "@/shared/_schemas";

const slugLoader = buildRouteParamLoader({
    schema: SlugRouteParamSchema,
    redirectTo: "/account/profile",
    onErrorMessage: "Invalid reservation identifier.",
});

/**
 * Defines the account route hierarchy for authenticated users.
 */
export const UserProfileRoutes: RouteObject[] = [
    {
        path: "/account",
        element: (
            <RequireAuth>
                <BaseLayout/>
            </RequireAuth>
        ),
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/account/profile",
                lazy: async () => {
                    const {MyProfilePage} = await import("@/views/client/users");
                    return {Component: MyProfilePage};
                },
            },
            {
                path: "/account/favourites",
                lazy: async () => {
                    const {MyFavouritesPage} = await import("@/views/client/users");
                    return {Component: MyFavouritesPage};
                },
            },
            {
                path: "/account/reviews",
                lazy: async () => {
                    const {MyReviewsPage} = await import("@/views/client/users");
                    return {Component: MyReviewsPage};
                },
            },
            {
                path: "/account/reservations/:slug",
                loader: slugLoader,
                lazy: async () => {
                    const {MyReservationPage} = await import("@/views/client/users");
                    return {Component: MyReservationPage};
                },
            },
            {
                path: "/account/reservations",
                lazy: async () => {
                    const {MyReservationsPage} = await import("@/views/client/users");
                    return {Component: MyReservationsPage};
                },
            },
        ],
    }
];
