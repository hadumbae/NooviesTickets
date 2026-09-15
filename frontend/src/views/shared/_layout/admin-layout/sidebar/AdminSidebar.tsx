/**
 * @fileoverview Main sidebar navigation component for the administrative dashboard.
 */

import {ReactElement} from 'react';
import {Sidebar, SidebarContent, SidebarHeader,} from "@/views/shared/_comp/ui/sidebar/sidebar.tsx";
import {LoggedLink} from "@/views/shared/_feat/navigation/LoggedLink.tsx";
import {LayoutThemeSidebarGroup} from "@/views/shared/_layout/common/sidebar/LayoutThemeSidebarGroup.tsx";
import {cn} from "@/shared/_feat";
import {
    AdminAccountSidebarGroup,
    AdminAuthSidebarGroup,
    AdminDashboardSidebarGroup,
    AdminMovieSidebarGroup,
    AdminReservationSidebarGroup,
    AdminSetupSidebarGroup
} from "@/views/shared/_layout/admin-layout/sidebar/admin-side-bar-groups";

/** Renders the administrative sidebar navigation shell and grouping structure. */
export function AdminSidebar(): ReactElement {
    return (
        <Sidebar>
            <SidebarHeader>
                <LoggedLink
                    to="/admin/dashboard"
                    className={cn(
                        "flex items-end justify-center space-x-2",
                        "tracking-tight px-4 py-2",
                    )}
                >
                    <span className="font-playwriteRoCursive text-3xl">Noovies</span>
                    <span className="text-gray-400 italic">Admin</span>
                </LoggedLink>
            </SidebarHeader>

            <SidebarContent className="font-spaceGrotesk">
                <AdminDashboardSidebarGroup/>
                <AdminSetupSidebarGroup/>
                <AdminMovieSidebarGroup/>
                <AdminReservationSidebarGroup/>
                <AdminAccountSidebarGroup/>

                <LayoutThemeSidebarGroup/>
                <AdminAuthSidebarGroup/>
            </SidebarContent>
        </Sidebar>
    );
}