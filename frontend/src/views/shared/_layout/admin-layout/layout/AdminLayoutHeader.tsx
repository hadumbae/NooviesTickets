/**
 * @fileoverview Header component for the admin layout section.
 */

import {ReactElement} from 'react';
import {LayoutTitle} from "@/views/shared/_comp/layout/LayoutTitle.tsx";
import {
    LayoutBreakpointIndicator
} from "@/views/shared/_comp/layout/LayoutBreakpointIndicator.tsx";
import {useRequiredContext} from "@/shared/_feat/use-context/useRequiredContext.ts";
import {SidebarContext, SidebarTrigger} from "@/views/shared/_comp/ui";
import {
    AdminLayoutDesktopNavigation
} from "@/views/shared/_layout/admin-layout/navigation/AdminLayoutDesktopNavigation.tsx";

/**
 * Header for the admin dashboard that toggles between desktop navigation and a mobile sidebar trigger.
 */
export function AdminLayoutHeader(): ReactElement {
    const {isMobile} = useRequiredContext({context: SidebarContext});

    return (
        <header className="flex justify-between items-center">
            <LayoutTitle text="Noovies Admin"/>

            <div className="flex justify-center space-x-5">
                <LayoutBreakpointIndicator/>
            </div>

            {!isMobile && <AdminLayoutDesktopNavigation/>}

            {isMobile && <SidebarTrigger className="dark:text-white"/>}
        </header>
    );
}