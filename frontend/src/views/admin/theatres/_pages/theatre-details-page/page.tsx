/**
 * @fileoverview Administrative page for displaying and managing the details of a specific theatre.
 */

import {ReactElement} from 'react';
import {useSetAdminPageTitle} from "@/shared/_feat";
import {SlugRouteParamObject} from "@/shared/_schemas/route/SlugRouteParamSchema.ts";
import {useLoaderData} from "react-router-dom";
import {
    QueryErrorBoundary
} from "@/views/shared/_feat/error-boundary/query-error-fallback/boundary/QueryErrorBoundary.tsx";
import {QueryDataLoader} from "@/views/shared/_feat";
import {useParsedPaginationValue} from "@/shared/_feat/fetch-pagination-search-params";

import {TheatreDetailsPageContent} from "@/views/admin/theatres/_pages/theatre-details-page/content.tsx";
import {TheatreDetailsUIContextProvider} from "@/domains/theatres/_ctx/theatre-details-ui";
import {TheatreDetailsViewData} from "@/domains/theatres/_feat/admin-view-data/schema/TheatreDetailsViewDataSchema.ts";
import {TheatreHttpStatusOverrideText} from "@/domains/theatres/_const/TheatreHttpStatusOverrideText.ts";
import {
    useFetchTheatreDetailsViewData
} from "@/domains/theatres/_feat/admin-view-data/fetch/useFetchTheatreDetailsViewData.ts";

/** Number of screens displayed per pagination page. */
const SCREENS_PER_PAGE = 25;
/** Maximum number of upcoming showings to display in the overview. */
const SHOWINGS_LIMIT = 10;

/**
 * Administrative page component for viewing and managing a specific theatre's details.
 */
export function TheatreDetailsPage(): ReactElement {
    const {setTitle} = useSetAdminPageTitle({presetTitle: "Theatre Details"})

    const {slug} = useLoaderData<SlugRouteParamObject>();

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    const query = useFetchTheatreDetailsViewData({
        slug,
        queries: {screenPage: page, screenPerPage: SCREENS_PER_PAGE, showingLimit: SHOWINGS_LIMIT},
    });

    return (
        <QueryErrorBoundary statusTextOverride={TheatreHttpStatusOverrideText}>
            <TheatreDetailsUIContextProvider>
                <QueryDataLoader query={query}>
                    {(data: TheatreDetailsViewData) => (
                        <TheatreDetailsPageContent
                            pageData={data}
                            screenPage={page}
                            screenPerPage={SCREENS_PER_PAGE}
                            setScreenPage={setPage}
                            setTitle={setTitle}
                        />
                    )}
                </QueryDataLoader>
            </TheatreDetailsUIContextProvider>
        </QueryErrorBoundary>
    );
}