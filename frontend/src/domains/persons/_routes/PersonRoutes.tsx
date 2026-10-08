/**
 * @fileoverview Route configuration for the administrative Persons domain.
 */

import {ComponentErrorHandler} from "@/views/shared/_feat/error/ComponentErrorHandler.tsx";
import {AdminLayout} from "@/views/shared/_layout/admin-layout/AdminLayout.tsx";
import {RequireAdmin} from "@/views/shared/_feat/auth";
import {buildRouteParamLoader} from "@/shared/_loaders";
import {SlugRouteParamSchema} from "@/shared/_schemas";

const slugLoader = buildRouteParamLoader({
    schema: SlugRouteParamSchema,
    redirectTo: "/admin/persons",
    onErrorMessage: "Invalid Person Identifier.",
});

/**
 * Admin "Persons" route definitions.
 */
export const PersonRoutes = [
    {
        path: '/admin/persons',
        element: (
            <RequireAdmin>
                <AdminLayout/>
            </RequireAdmin>
        ),
        children: [
            {
                path: "/admin/persons",
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {PersonIndexPage} = await import("@/views/admin/persons/_pages/index-page/page.tsx");
                    const {PersonIndexQueryOptionsContextProvider} = await import("@/domains/persons/_feat/validate-query-options/person-index/PersonIndexQueryOptionsContext.ts");
                    return {
                        Component: () => (
                            <PersonIndexQueryOptionsContextProvider>
                                <PersonIndexPage/>
                            </PersonIndexQueryOptionsContextProvider>
                        ),
                    };
                },
            },
            {
                path: "/admin/persons/get/:slug",
                errorElement: <ComponentErrorHandler/>,
                loader: slugLoader,
                lazy: async () => {
                    const {PersonDetailsPage} = await import("@/views/admin/persons/_pages/details-page");
                    const {
                        PersonDeletingUIContextProvider,
                        PersonFormUIContextProvider,
                        PersonImageFormUIContextProvider,
                    } = await import("@/domains/persons/_ctx/ui");
                    return {
                        Component: () => (
                            <PersonFormUIContextProvider>
                                <PersonImageFormUIContextProvider>
                                    <PersonDeletingUIContextProvider>
                                        <PersonDetailsPage/>
                                    </PersonDeletingUIContextProvider>
                                </PersonImageFormUIContextProvider>
                            </PersonFormUIContextProvider>
                        ),
                    };
                },
            }
        ],
    }
];
