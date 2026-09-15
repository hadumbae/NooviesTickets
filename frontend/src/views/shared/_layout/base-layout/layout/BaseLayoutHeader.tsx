/**
 * @fileoverview Header component for the primary client-side base layout handling top navigation and responsive triggers.
 */

import {ReactElement} from 'react';
import {LayoutTitle} from "@/views/shared/_comp/layout/LayoutTitle.tsx";
import {
    LayoutBreakpointIndicator
} from "@/views/shared/_comp/layout/LayoutBreakpointIndicator.tsx";
import {SidebarTrigger} from "@/views/shared/_comp/ui/sidebar/sidebar.tsx";
import {useRequiredContext} from "@/shared/_feat/use-context/useRequiredContext.ts";
import {SidebarContext} from "@/views/shared/_comp/ui/sidebar/SidebarContext.ts";
import BaseLayoutDesktopNavigation from "@/views/shared/_layout/client/navigation/BaseLayoutDesktopNavigation.tsx";

/** Renders the application header with title and navigation controls. Requires SidebarContext. */
export function BaseLayoutHeader(): ReactElement {
    const {isMobile} = useRequiredContext({context: SidebarContext});

    return (
        <header className="flex justify-between items-center">
            <LayoutTitle text="Noovies"/>

            <div className="flex justify-center space-x-5">
                <LayoutBreakpointIndicator/>
            </div>

            {!isMobile && <BaseLayoutDesktopNavigation/>}

            {isMobile && <SidebarTrigger className="dark:text-white"/>}
        </header>
    );
}