/**
 * @fileoverview Main sidebar navigation component for the client-facing application.
 */

import {ReactElement} from 'react';
import {Sidebar, SidebarContent, SidebarHeader} from "@/views/shared/_comp/ui/sidebar/sidebar.tsx";
import {
    ClientProfileSidebarGroup
} from "@/views/shared/_layout/base-layout/sidebar/client-side-bar/ClientProfileSidebarGroup.tsx";
import {Separator} from "@/views/shared/_comp/ui/separator.tsx";
import {
    AdminAuthSidebarGroup
} from "@/views/shared/_layout/admin-layout/sidebar/admin-side-bar-groups/AdminAuthSidebarGroup.tsx";
import {
    ClientBrowseSidebarGroup
} from "@/views/shared/_layout/base-layout/sidebar/client-side-bar/ClientBrowseSidebarGroup.tsx";
import AdminLinksSidebarGroup from "@/views/shared/_layout/common/navigation/side-bar-group/AdminLinksSidebarGroup.tsx";
import {LayoutThemeSidebarGroup} from "@/views/shared/_layout/common/sidebar/LayoutThemeSidebarGroup.tsx";
import {useAuthContext} from "@/domains/authentication/_feat/auth-context/useAuthContext.ts";

/** Renders the client sidebar navigation including browsing links, profile options, and conditional administrative links. Requires AuthContext. */
export function ClientSidebar(): ReactElement {
    const {isAdmin} = useAuthContext();

    return (
        <Sidebar>
            <SidebarHeader className="flex justify-center items-center">
                <h1 className="text-3xl font-playwriteRoCursive">Noovies</h1>
            </SidebarHeader>

            <SidebarContent className="font-spaceGrotesk">
                {
                    isAdmin && <>
                        <Separator/>
                        <AdminLinksSidebarGroup/>
                    </>
                }

                <Separator/>
                <ClientBrowseSidebarGroup/>

                <Separator/>
                <ClientProfileSidebarGroup/>

                <Separator/>
                <LayoutThemeSidebarGroup/>

                <Separator/>
                <AdminAuthSidebarGroup/>
            </SidebarContent>
        </Sidebar>
    );
}