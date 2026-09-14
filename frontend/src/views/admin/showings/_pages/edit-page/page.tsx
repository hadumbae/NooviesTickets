/**
 * @fileoverview Admin page for editing an existing Showing.
 */

import {ReactElement} from 'react';
import {PageLoader} from "@/views/shared/_comp/page";
import {
    useFetchByIdentifierRouteParams
} from "@/shared/_feat";
import {SlugRouteParamSchema} from "@/shared/_schemas/route/SlugRouteParamSchema.ts";
import {QueryDataLoader} from "@/views/shared/_feat";

import {ShowingDetails, ShowingDetailsSchema} from "@/domains/showings/_schema/showing/ShowingDetailsSchema.ts";
import {useFetchShowingBySlug} from "@/domains/showings/_feat/crud-hooks/fetch/useFetchShowingBySlug.ts";
import {ShowingEditPageContent} from "@/views/admin/showings/_pages/edit-page/content.tsx";

/**
 * Page component for editing a Showing.
 */
export function ShowingEditPage(): ReactElement {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        sourceComponent: ShowingEditPage.name,
        errorTo: "/admin/showings",
        errorMessage: "Failed to resolve route parameters.",
    }) ?? {};

    const query = useFetchShowingBySlug({
        slug: slug!,
        config: {populate: true, virtuals: true},
        schema: ShowingDetailsSchema,
        options: {enabled: !!slug},
    });

    if (!slug) {
        return <PageLoader/>;
    }

    return (
        <QueryDataLoader query={query}>
            {(showing: ShowingDetails) => (
                <ShowingEditPageContent showing={showing}/>
            )}
        </QueryDataLoader>
    );
}


