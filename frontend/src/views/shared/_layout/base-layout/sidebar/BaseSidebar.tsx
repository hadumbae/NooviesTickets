/**
 * @fileoverview Main sidebar selection component that renders user-role specific sidebar content for the base layout.
 */

import {ReactElement} from 'react';
import {GuestSidebar} from "@/views/shared/_layout/base-layout/sidebar/guest-side-bar/GuestSidebar.tsx";
import {
    ClientSidebar
} from "@/views/shared/_layout/base-layout/sidebar/client-side-bar/ClientSidebar.tsx";
import {useAuthContext} from "@/domains/authentication/_feat/auth-context/useAuthContext.ts";

/** Renders either the guest sidebar or client sidebar depending on authentication state. Requires AuthContext. */
export function BaseSidebar(): ReactElement {
    const {user} = useAuthContext();
    return user ? <ClientSidebar/> : <GuestSidebar/>;
}