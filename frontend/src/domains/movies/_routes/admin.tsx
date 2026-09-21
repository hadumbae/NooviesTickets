/**
 * @fileoverview Defines the routing configuration for movie management within the admin dashboard.
 */

import {RouteObject} from "react-router-dom";
import {ComponentErrorHandler} from "@/views/shared/_feat/error/ComponentErrorHandler.tsx";
import {AdminLayout} from "@/views/shared/_layout/admin-layout/AdminLayout.tsx";
import {RequireAdmin} from "@/views/shared/_feat/auth";
import {buildRouteParamLoader} from "@/shared/_loaders/buildRouteParamLoader.ts";
import {SlugRouteParamSchema} from "@/shared/_schemas/route/SlugRouteParamSchema.ts";

const movieSlugLoader = buildRouteParamLoader({
    schema: SlugRouteParamSchema,
    redirectTo: "/admin/movies",
    onErrorMessage: "Invalid Movie Slug.",
});

/** Route configuration for movie-related administrative pages. */
export const AdminMovieRoutes: RouteObject[] = [
    {
        path: '/admin/movies',
        element: (
            <RequireAdmin>
                <AdminLayout/>
            </RequireAdmin>
        ),
        children: [
            {
                path: "/admin/movies",
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {MovieIndexPage} = await import("@/views/admin/movies");
                    const {MovieIndexQueryOptionsContextProvider} = await import("@/domains/movies/_feat/handle-query-options/movie-index");
                    return {
                        Component: () => (
                            <MovieIndexQueryOptionsContextProvider>
                                <MovieIndexPage/>
                            </MovieIndexQueryOptionsContextProvider>
                        ),
                    };
                },
            },
            {
                path: "/admin/movies/create",
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {MovieCreatePage} = await import("@/views/admin/movies");
                    return {Component: MovieCreatePage};
                },
            },
            {
                path: "/admin/movies/get/:slug",
                errorElement: <ComponentErrorHandler/>,
                loader: movieSlugLoader,
                lazy: async () => {
                    const {MovieDetailsPage} = await import("@/views/admin/movies");
                    return {Component: MovieDetailsPage};
                },
            },
            {
                path: "/admin/movies/get/:slug/showings",
                errorElement: <ComponentErrorHandler/>,
                loader: movieSlugLoader,
                lazy: async () => {
                    const {MovieShowingsPage} = await import("@/views/admin/movies");
                    return {Component: MovieShowingsPage};
                },
            },
            {
                path: "/admin/movies/get/:slug/showings/create",
                errorElement: <ComponentErrorHandler/>,
                loader: movieSlugLoader,
                lazy: async () => {
                    const {MovieCreateShowingPage} = await import("@/views/admin/movies");
                    return {Component: MovieCreateShowingPage};
                },
            },
            {
                path: "/admin/movies/edit/:slug",
                errorElement: <ComponentErrorHandler/>,
                loader: movieSlugLoader,
                lazy: async () => {
                    const {MovieEditPage} = await import("@/views/admin/movies");
                    return {Component: MovieEditPage};
                },
            },
            {
                path: "/admin/movies/get/:slug/people/cast",
                errorElement: <ComponentErrorHandler/>,
                loader: movieSlugLoader,
                lazy: async () => {
                    const {MoviePeoplePage} = await import("@/views/admin/movies");
                    return {Component: () => <MoviePeoplePage department="CAST"/>};
                },
            },
            {
                path: "/admin/movies/get/:slug/people/crew",
                errorElement: <ComponentErrorHandler/>,
                loader: movieSlugLoader,
                lazy: async () => {
                    const {MoviePeoplePage} = await import("@/views/admin/movies");
                    return {Component: () => <MoviePeoplePage department="CREW"/>};
                },
            }
        ],
    }
];
