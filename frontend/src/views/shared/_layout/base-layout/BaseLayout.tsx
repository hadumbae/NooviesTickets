/**
 * @fileoverview Main client layout wrapper providing the responsive sidebar, header, content, and footer structure.
 */

import {ReactElement} from 'react';
import {SidebarProvider} from "@/views/shared/_comp/ui/sidebar/sidebar.tsx";
import {BaseSidebar} from "@/views/shared/_layout/base-layout/sidebar/BaseSidebar.tsx";
import {BaseLayoutContent} from "@/views/shared/_layout/base-layout/layout/BaseLayoutContent.tsx";
import {BaseLayoutHeader} from "@/views/shared/_layout/base-layout/layout/BaseLayoutHeader.tsx";
import {BaseLayoutFooter} from "@/views/shared/_layout/base-layout/layout/BaseLayoutFooter.tsx";
import {useIsMobile} from "@/shared/_feat/handle-ui/useIsMobile.tsx";
import {cn} from "@/shared/_feat";

/** Client-side layout wrapper that manages mobile navigation and renders the application frame. */
export function BaseLayout(): ReactElement {
    const isMobile = useIsMobile();

    return (
        <SidebarProvider>
            {isMobile && <BaseSidebar/>}

            <main className={cn(
                "flex flex-col space-y-1 p-3 w-full",
                "bg-gray-50 dark:bg-dark"
            )}>
                <BaseLayoutHeader/>
                <BaseLayoutContent/>
                <BaseLayoutFooter/>
            </main>
        </SidebarProvider>
    );
}