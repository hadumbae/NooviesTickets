/**
 * @fileoverview Navigation dropdown component for showing and reservation management in the admin layout.
 */

import {ReactElement} from 'react';
import {useCurrentURLPath} from "@/shared/_feat/navigation";
import {DropdownMenuLink} from "@/views/shared/_feat/navigation";
import {NavigationDropdownButton} from "@/views/shared/_comp/buttons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/views/shared/_comp/ui";

/**
 * Navigation dropdown providing links to showing schedules and reservation lookups.
 */
export function AdminLayoutShowingNavigationDropdown(): ReactElement {
    const url = useCurrentURLPath();

    const pathNames = [
        "/admin/showings",
        "/admin/reservations/fetch/by-unique-code",
    ];

    const isActive = pathNames.includes(url);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <NavigationDropdownButton
                    text="Showings"
                    isActive={isActive}
                />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {/** Theater Scheduling Links */}
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Showings</DropdownMenuLabel>

                    <DropdownMenuLink to="/admin/showings">
                        Showings
                    </DropdownMenuLink>
                </DropdownMenuGroup>

                <DropdownMenuSeparator/>

                {/** Ticketing & Verification Links */}
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Reservations</DropdownMenuLabel>

                    <DropdownMenuLink to="/admin/reservations/fetch/by-unique-code">
                        Reservation By Code
                    </DropdownMenuLink>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}