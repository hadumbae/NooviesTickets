/**
 * @fileoverview Sidebar navigation group for user profile and personal account links.
 */

import {ReactElement} from 'react';
import {Link} from "react-router-dom";
import {TableOfContents} from "lucide-react";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/views/shared/_comp/ui/sidebar/sidebar.tsx";

/** Renders sidebar navigation options for managing account profile, favourites, reviews, and reservations. */
export function ClientProfileSidebarGroup(): ReactElement {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>My Profile</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/account/profile">
                                <TableOfContents/>
                                <span>My Profile</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/account/favourites">
                                <TableOfContents/>
                                <span>My Favourites</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/account/reviews">
                                <TableOfContents/>
                                <span>My Reviews</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/account/reservations">
                                <TableOfContents/>
                                <span>My Reservations</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}