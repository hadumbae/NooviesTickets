/**
 * @fileoverview Admin page for editing an existing Showing.
 */

import {ReactElement} from 'react';
import {SlugRouteParamObject} from "@/shared/_schemas/route/SlugRouteParamSchema.ts";
import {QueryDataLoader} from "@/views/shared/_feat";
import {useLoaderData} from "react-router-dom";

import {ShowingDetails, ShowingDetailsSchema} from "@/domains/showings/_schema/showing/ShowingDetailsSchema.ts";
import {useFetchShowingBySlug} from "@/domains/showings/_feat/crud-hooks/fetch/useFetchShowingBySlug.ts";
import {ShowingEditPageContent} from "@/views/admin/showings/_pages/edit-page/content.tsx";

/**
 * Page component for editing a Showing.
 */
export function ShowingEditPage(): ReactElement {
    const {slug} = useLoaderData<SlugRouteParamObject>();

    const query = useFetchShowingBySlug({
        slug,
        config: {populate: true, virtuals: true},
        schema: ShowingDetailsSchema,
    });

    return (
        <QueryDataLoader query={query}>
            {(showing: ShowingDetails) => (
                <ShowingEditPageContent showing={showing}/>
            )}
        </QueryDataLoader>
    );
}


