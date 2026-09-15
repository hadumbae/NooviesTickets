/**
 * @fileoverview Route configurations for the genre management administration area.
 */

import {RouteObject} from "react-router-dom";
import {AdminLayout} from "@/views/shared/_layout/admin-layout/AdminLayout.tsx";
import {RequireAdmin} from "@/views/shared/_feat/auth";

/** Route definitions for genre administration, including index and detail views. */
export const AdminGenreRoutes: RouteObject[] = [
    {
        path: "/admin/genres",
        element: (
            <RequireAdmin>
                <AdminLayout/>
            </RequireAdmin>
        ),
        children: [
            {
                path: "/admin/genres",
                lazy: async () => {
                    const {GenreIndexPage} = await import("@/views/admin/genres");
                    const {GenreIndexQueryOptionsContextProvider} = await import("@/domains/genres/_feat/handle-query-options/genre-index/GenreIndexQueryOptionsContext.ts");
                    return {
                        Component: () => (
                            <GenreIndexQueryOptionsContextProvider>
                                <GenreIndexPage/>
                            </GenreIndexQueryOptionsContextProvider>
                        ),
                    };
                },
            },
            {
                path: "/admin/genres/get/:slug",
                lazy: async () => {
                    const {GenreDetailsPage} = await import("@/views/admin/genres");
                    return {Component: GenreDetailsPage};
                },
            },
        ],
    },
];
