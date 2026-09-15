/**
 * @fileoverview Access boundary component for restricting routes to authenticated admin users.
 */

import {ReactNode} from "react";
import {NotAdminWarning} from "@/views/shared/_layout/admin-layout/warnings/NotAdminWarning.tsx";
import {PageFlexWrapper} from "@/views/shared/_comp/page";
import {useAuthContext} from "@/domains/authentication/_feat/auth-context/useAuthContext.ts";

/** Props for the AdminBoundary component. */
type BoundaryProps = {
    children: ReactNode;
};

/** Renders protected children if the current user is an admin, or a warning if unauthorized. */
export function AdminBoundary({children}: BoundaryProps): ReactNode {
    const {user, isAdmin} = useAuthContext();

    if (!user || !isAdmin) {
        return (
            <PageFlexWrapper className="justify-center items-center">
                <NotAdminWarning user={user} isAdmin={isAdmin}/>
            </PageFlexWrapper>
        );
    }

    return children;
}