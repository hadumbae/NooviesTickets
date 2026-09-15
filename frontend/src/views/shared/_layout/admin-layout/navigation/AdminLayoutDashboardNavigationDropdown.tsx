/**
 * @fileoverview Dashboard and client-access navigation dropdown component for the administrative layout.
 */

import {ReactElement} from 'react';
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/views/shared/_comp/ui/dropdown-menu.tsx";
import {useCurrentURLPath} from "@/shared/_feat/navigation/useCurrentURLPath.ts";
import {DropdownMenuLink} from "@/views/shared/_feat/navigation/DropdownMenuLink.tsx";
import {NavigationDropdownButton} from "@/views/shared/_comp/buttons/NavigationDropdownButton.tsx";

/** Navigation dropdown component providing high-level redirection between Admin and Client contexts. */
export function AdminLayoutDashboardNavigationDropdown(): ReactElement {
    const url = useCurrentURLPath();

    const pathNames = [
        "/admin/dashboard",
    ];

    const isActive = pathNames.includes(url);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <NavigationDropdownButton text="Dashboard" isActive={isActive}/>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuLink to="/admin/dashboard">
                    Dashboard
                </DropdownMenuLink>

                <DropdownMenuLink to="/">
                    Client Pages
                </DropdownMenuLink>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}