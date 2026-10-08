/**
 * @fileoverview Administrative page for creating a new showing under a specific theatre.
 */

import {ReactElement} from "react";
import {useSetAdminPageTitle} from "@/shared/_feat";
import {SlugRouteParamObject} from "@/shared/_schemas/route/SlugRouteParamSchema.ts";
import {
    QueryErrorBoundary
} from "@/views/shared/_feat/error-boundary/query-error-fallback/boundary/QueryErrorBoundary.tsx";
import {useFetchTheatreBySlug} from "@/domains/theatres/_feat/crud-hooks";
import {QueryDataLoader} from "@/views/shared/_feat";
import {useLoaderData} from "react-router-dom";

import {Theatre, TheatreSchema} from "@noovies-tickets/common";
import {TheatreHttpStatusOverrideText} from "@/domains/theatres/_const/TheatreHttpStatusOverrideText.ts";
import {TheatreShowingCreatePageContent} from "@/views/admin/theatres/_pages/theatre-showings-create/content.tsx";

/**
 * Page component that resolves theatre route parameters and initializes the showing creation flow.
 */
export function TheatreShowingCreatePage(): ReactElement {
    const {setTitle} = useSetAdminPageTitle({presetTitle: "Create Showing For Theatre"})

    const {slug} = useLoaderData<SlugRouteParamObject>();

    const query = useFetchTheatreBySlug({
        schema: TheatreSchema,
        slug,
    });

    return (
        <QueryErrorBoundary statusTextOverride={TheatreHttpStatusOverrideText}>
            <QueryDataLoader query={query}>
                {(theatre: Theatre) => (
                    <TheatreShowingCreatePageContent
                        theatre={theatre}
                        setTitle={setTitle}
                    />
                )}
            </QueryDataLoader>
        </QueryErrorBoundary>
    );
}