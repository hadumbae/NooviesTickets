/**
 * @fileoverview React Router configuration for the Theatre administration module.
 */

import {AdminLayout} from "@/views/shared/_layout/admin-layout/AdminLayout.tsx";
import {RequireAdmin} from "@/views/shared/_feat/auth";
import {buildRouteParamLoader} from "@/shared/_loaders";
import {SlugRouteParamSchema} from "@/shared/_schemas";
import {TheatreScreenDetailsRouteParamSchema} from "@/domains/theatre-screens";

const slugLoader = buildRouteParamLoader({
    schema: SlugRouteParamSchema,
    redirectTo: "/admin/theatres",
    onErrorMessage: "Invalid theatre identifier.",
});

const screenSlugLoader = buildRouteParamLoader({
    schema: TheatreScreenDetailsRouteParamSchema,
    redirectTo: "/admin/theatres",
    onErrorMessage: "Failed to parse theatre and screen route parameters.",
});

/**
 * Defines the routing hierarchy for theatre management.
 */
const routes = [
    {
        path: "/admin/theatres",
        element: (
            <RequireAdmin>
                <AdminLayout/>
            </RequireAdmin>
        ),
        children: [
            {
                index: true,
                lazy: async () => {
                    const {TheatreIndexPage} = await import("@/views/admin/theatres/_pages");
                    const {TheatreIndexQueryOptionsContextProvider} = await import("@/domains/theatres/_feat/handle-query-options/theatre-index/TheatreIndexQueryOptionsContext.ts");
                    return {
                        Component: () => (
                            <TheatreIndexQueryOptionsContextProvider>
                                <TheatreIndexPage/>
                            </TheatreIndexQueryOptionsContextProvider>
                        ),
                    };
                },
            },
            {
                path: "get/:slug",
                loader: slugLoader,
                lazy: async () => {
                    const {TheatreDetailsPage} = await import("@/views/admin/theatres/_pages");
                    return {Component: TheatreDetailsPage};
                },
            },
            {
                path: "get/:slug/showings/create",
                loader: slugLoader,
                lazy: async () => {
                    const {TheatreShowingCreatePage} = await import("@/views/admin/theatres/_pages");
                    return {Component: TheatreShowingCreatePage};
                },
            },
            {
                path: "get/:slug/showings/list",
                loader: slugLoader,
                lazy: async () => {
                    const {TheatreShowingListPage} = await import("@/views/admin/theatres/_pages");
                    return {Component: TheatreShowingListPage};
                },
            },
            {
                path: "get/:theatreSlug/screen/:screenSlug",
                loader: screenSlugLoader,
                lazy: async () => {
                    const {TheatreScreenDetailsPage} = await import("@/views/admin/theatres/_pages");
                    const {
                        TheatreScreenDetailsQueryOptionsContextProvider
                    } = await import("@/domains/theatre-screens/_feat/validate-query-options/theatre-screen-details");
                    return {
                        Component: () => (
                            <TheatreScreenDetailsQueryOptionsContextProvider defaultValues={{recentShowingsCount: 10}}>
                                <TheatreScreenDetailsPage/>
                            </TheatreScreenDetailsQueryOptionsContextProvider>
                        ),
                    };
                },
            },
        ],
    },
];

export {
    routes as TheatreAdminRoutes,
}
