/**
 * @fileoverview Main layout component for the administrative dashboard.
 */

import {ReactElement} from "react";
import {cn} from "@/shared/_feat/handle-ui/cn.ts";
import {SidebarProvider} from "@/views/shared/_comp/ui/sidebar/sidebar.tsx";
import {useIsMobile} from "@/shared/_feat/handle-ui/useIsMobile.tsx";
import {AdminSidebar} from "@/views/shared/_layout/admin-layout/sidebar/AdminSidebar.tsx";
import {AdminLayoutHeader} from "@/views/shared/_layout/admin-layout/layout/AdminLayoutHeader.tsx";
import {AdminLayoutContent} from "@/views/shared/_layout/admin-layout/layout/AdminLayoutContent.tsx";
import {AdminLayoutFooter} from "@/views/shared/_layout/admin-layout/layout/AdminLayoutFooter.tsx";

/**
 * Renders the administrative layout shell including navigation, layout content, and security boundaries.
 */
export function AdminLayout(): ReactElement {
    const isMobile = useIsMobile();

    return (
        <SidebarProvider>
            {isMobile && <AdminSidebar/>}

            <main
                className={cn(
                    "flex flex-col space-y-1 p-3 w-full",
                    "bg-gray-50 dark:bg-dark"
                )}
            >
                <AdminLayoutHeader/>
                <AdminLayoutContent/>
                <AdminLayoutFooter/>
            </main>
        </SidebarProvider>
    );
}