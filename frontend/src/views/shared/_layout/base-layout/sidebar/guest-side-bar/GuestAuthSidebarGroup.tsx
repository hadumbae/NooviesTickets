/**
 * @fileoverview Sidebar navigation group for guest authentication actions.
 */

import {ReactElement} from 'react';
import {User} from "lucide-react";
import {Link} from "react-router-dom";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/views/shared/_comp/ui/sidebar/sidebar.tsx";

/** Renders sidebar menu items for guest registration and login routes. */
export function GuestAuthSidebarGroup(): ReactElement {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Authentication</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/auth/register">
                                <User/>
                                <span>Register</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/auth/login">
                                <User/>
                                <span>Login</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}