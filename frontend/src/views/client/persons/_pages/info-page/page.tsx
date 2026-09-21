/**
 * @fileoverview Page component for displaying detailed information and filmography of a specific person.
 */

import {ReactElement} from "react";
import {PersonInfoContent} from "@/views/client/persons/_pages/info-page/content.tsx";
import {usePersonInfoRouteParams} from "@/domains/persons/_feat/fetch-route-params";
import {useLoggedNavigate} from "@/shared/_feat/navigation/useLoggedNavigate.ts";
import {PageLoader} from "@/views/shared/_comp";
import {toast} from "react-toastify";
import {useFetchPersonInfoViewData} from "@/domains/persons/_feat/client-view-data";
import {QueryDataLoader} from "@/views/shared/_feat";
import {useSetPageTitle} from "@/shared/_feat";

/**
 * Entry point for the person details view.
 */
export function PersonInfoPage(): ReactElement {
    const {setTitle} = useSetPageTitle({presetTitle: "Person"});

    const navigate = useLoggedNavigate();
    const {slug} = usePersonInfoRouteParams();

    const query = useFetchPersonInfoViewData({
        slug: slug!,
        options: {enabled: !!slug},
    });

    if (!slug) {
        navigate({level: "warn", to: "/browse/persons", message: "Invalid person slug."});
        toast.warn("Person Not Found.");

        return <PageLoader/>;
    }

    return (
        <QueryDataLoader query={query}>
            {({person, filmography}) => (
                <PersonInfoContent
                    person={person}
                    filmography={filmography}
                    setTitle={setTitle}/>
            )}
        </QueryDataLoader>
    );
}