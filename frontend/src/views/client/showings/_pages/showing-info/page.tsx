/**
 * @fileoverview Page component for displaying detailed information about a specific movie showing.
 */

import {ReactElement} from "react";
import {
    useFetchByIdentifierRouteParams, useSetPageTitle
} from "@/shared/_feat";
import {PageLoader} from "@/views/shared/_comp/page";
import {SlugRouteParamSchema} from "@/shared/_schemas/route/SlugRouteParamSchema.ts";
import {QueryDataLoader} from "@/views/shared/_feat";

import {ShowingInfoPageContent} from "@/views/client/showings/_pages/showing-info/content.tsx";
import {ShowingDetails, ShowingDetailsSchema} from "@/domains/showings/_schema/showing/ShowingDetailsSchema.ts";
import {useFetchShowingBySlug} from "@/domains/showings/_feat/crud-hooks/fetch/useFetchShowingBySlug.ts";

/**
 * Entry point for the showing details view.
 */
export function ShowingInfoPage(): ReactElement {
    const {setTitle} = useSetPageTitle({presetTitle: "Showing"});

    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        sourceComponent: ShowingInfoPage.name,
        errorTo: "/",
        errorMessage: "Invalid Showing identifier.",
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
                <ShowingInfoPageContent showing={showing} setTitle={setTitle}/>
            )}
        </QueryDataLoader>
    );
}