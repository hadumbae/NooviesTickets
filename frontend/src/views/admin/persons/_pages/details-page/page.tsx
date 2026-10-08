/**
 * @fileoverview Page component for displaying detailed information about a person in the admin dashboard.
 */

import {ReactElement} from 'react';
import {useSetAdminPageTitle} from "@/shared/_feat";
import {SlugRouteParamObject} from "@/shared/_schemas/route/SlugRouteParamSchema.ts";
import {QueryDataLoader} from "@/views/shared/_feat";
import {PersonDetailsPageContent} from "@/views/admin/persons/_pages/details-page/content.tsx";
import {PersonDetailsViewData, useFetchPersonDetailsViewData} from "@/domains/persons/_feat/admin-view-data";
import {useLoaderData} from "react-router-dom";

/**
 * Renders the person's detailed profile page using route parameters to fetch biographical and filmography data.
 */
export function PersonDetailsPage(): ReactElement {
    const {setTitle} = useSetAdminPageTitle({presetTitle: "Person Details"})

    const {slug} = useLoaderData<SlugRouteParamObject>();

    const query = useFetchPersonDetailsViewData({
        slug,
        limit: 5,
    });

    return (
        <QueryDataLoader query={query}>
            {({person, stats, filmography}: PersonDetailsViewData) => (
                <PersonDetailsPageContent
                    person={person}
                    creditCount={stats.creditCount}
                    movieCount={stats.movieCount}
                    filmography={filmography}
                    setTitle={setTitle}
                />
            )}
        </QueryDataLoader>
    );
}