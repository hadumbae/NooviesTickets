/**
 * @fileoverview Page container for the authenticated user's profile.
 */

import {ReactElement} from "react";
import {useGetCurrentUser} from "@/domains/authentication/_feat";
import {useSetPageTitle} from "@/shared/_feat";
import {MyProfilePageContent} from "@/views/client/users/my-profile-page/content.tsx";

/**
 * Renders the profile page for the current authenticated user.
 */
export function MyProfilePage(): ReactElement {
    useSetPageTitle({presetTitle: "My Profile"});
    const user = useGetCurrentUser();

    return (
        <MyProfilePageContent
            user={user}
        />
    );
}

