/**
 * @fileoverview Route definitions for the administrative reservation feature set.
 */

import {RouteObject} from "react-router-dom";
import {AdminLayout} from "@/views/shared/_layout/admin-layout/AdminLayout.tsx";
import {ComponentErrorHandler} from "@/views/shared/_feat/error/ComponentErrorHandler.tsx";
import {RequireAdmin} from "@/views/shared/_feat/auth";

/** Configuration for reservation-related administrative routes. */
export const AdminReservationRoutes: RouteObject[] = [
    {
        path: "/admin/reservations",
        element: (
            <RequireAdmin>
                <AdminLayout/>
            </RequireAdmin>
        ),
        children: [
            {
                /** Page for verifying individual reservation via their unique verification string. */
                path: '/admin/reservations/fetch/by-unique-code',
                errorElement: <ComponentErrorHandler/>,
                lazy: async () => {
                    const {ReservationByCodePage} = await import("@/views/admin/reservations/_pages/reservation-by-code");
                    const {
                        FetchReservationByCodeQueryOptionsContextProvider
                    } = await import("@/domains/reservations/_feat/fetch-reservation-by-code/reservation-query-options-form");
                    return {
                        Component: () => (
                            <FetchReservationByCodeQueryOptionsContextProvider>
                                <ReservationByCodePage/>
                            </FetchReservationByCodeQueryOptionsContextProvider>
                        ),
                    };
                },
            }
        ],
    }
];
