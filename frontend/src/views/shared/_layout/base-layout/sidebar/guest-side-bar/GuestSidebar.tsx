/**
 * @fileoverview Main sidebar navigation component for guest users.
 */

import {ReactElement} from 'react';
import {Sidebar, SidebarContent, SidebarHeader,} from "@/views/shared/_comp/ui/sidebar/sidebar.tsx";
import {
    GuestAuthSidebarGroup
} from "@/views/shared/_layout/base-layout/sidebar/guest-side-bar/GuestAuthSidebarGroup.tsx";

/** Renders the guest navigation sidebar containing authentication options. */
export function GuestSidebar(): ReactElement {
    return (
        <Sidebar>
            <SidebarHeader>
                Noovies
            </SidebarHeader>

            <SidebarContent className="font-spaceGrotesk">
                <GuestAuthSidebarGroup/>
            </SidebarContent>
        </Sidebar>
    );
}