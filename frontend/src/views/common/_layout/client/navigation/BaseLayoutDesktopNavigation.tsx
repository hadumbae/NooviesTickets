import {FC} from 'react';
import {
    BaseLayoutDesktopGuestNavigation
} from "@/views/common/_layout/base-layout/navigation/desktop-guest-navigation/BaseLayoutDesktopGuestNavigation.tsx";
import {
    BaseLayoutDesktopClientNavigation
} from "@/views/common/_layout/client/navigation/desktop-client-navigation/BaseLayoutDesktopClientNavigation.tsx";
import {useAuthContext} from "@/domains/auth/_feat/auth-context/useAuthContext.ts";

/**
 * Desktop navigation switch for the base layout.
 *
 * @remarks
 * Rendering:
 * - Guest → {@link BaseLayoutDesktopGuestNavigation}
 * - Authenticated user → {@link BaseLayoutDesktopClientNavigation}
 *
 * Requires {@link AuthContext}.
 */
const BaseLayoutDesktopNavigation: FC = () => {
    const {user} = useAuthContext();

    return user
        ? <BaseLayoutDesktopClientNavigation/>
        : <BaseLayoutDesktopGuestNavigation/>;
};

export default BaseLayoutDesktopNavigation;
