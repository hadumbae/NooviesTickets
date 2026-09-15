/**
 * @fileoverview Route configuration for the administrative Persons domain.
 */

import {ComponentErrorHandler} from "@/views/shared/_feat/error/ComponentErrorHandler.tsx";
import {AdminLayout} from "@/views/shared/_layout/admin-layout/AdminLayout.tsx";
import {RequireAdmin} from "@/views/shared/_feat/auth";

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
