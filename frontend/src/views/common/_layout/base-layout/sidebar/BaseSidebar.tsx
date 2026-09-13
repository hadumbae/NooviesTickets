import {FC} from 'react';
import GuestSidebar from "@/views/common/_layout/base-layout/sidebar/guest-side-bar/GuestSidebar.tsx";
import ClientSidebar from "@/views/common/_layout/base-layout/sidebar/client-side-bar/ClientSidebar.tsx";
import {useAuthContext} from "@/domains/auth/_feat/auth-context/useAuthContext.ts";

/**
 * Application sidebar switch.
 *
 * @remarks
 * Rendering:
 * - Guest → {@link GuestSidebar}
 * - Authenticated user → {@link ClientSidebar}
 *
 * Requires {@link AuthContext}.
 */
const BaseSidebar: FC = () => {
    const {user} = useAuthContext();
    return user ? <ClientSidebar/> : <GuestSidebar/>;
};

export default BaseSidebar;
