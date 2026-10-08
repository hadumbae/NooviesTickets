/**
 * @fileoverview Administrative page for displaying a paginated list of showings for a specific theatre.
 */

import {ReactElement} from "react";
import {useSetAdminPageTitle} from "@/shared/_feat";
import {QueryDataLoader} from "@/views/shared/_feat";
import {SlugRouteParamObject} from "@/shared/_schemas/route/SlugRouteParamSchema.ts";
import useParsedPaginationValue from "@/shared/_feat/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import {useLoaderData} from "react-router-dom";

import {TheatreShowingListViewData, useFetchTheatreShowingListViewData} from "@/domains/theatres/_feat/admin-view-data";
import {TheatreShowingListPageContent} from "@/views/admin/theatres/_pages/theatre-showings-list/content.tsx";

const SHOWINGS_PER_PAGE = 10;

/**
 * Page component that resolves theatre route parameters and fetches paginated showing data.
 */
export function TheatreShowingListPage(): ReactElement {
    const {setTitle} = useSetAdminPageTitle({presetTitle: "Showings For Theatre"});

    const {slug} = useLoaderData<SlugRouteParamObject>();

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    const query = useFetchTheatreShowingListViewData({
        slug,
        queries: {page, perPage: SHOWINGS_PER_PAGE},
    })

    return (
        <QueryDataLoader query={query}>
            {({theatre, showings: {totalItems, items}}: TheatreShowingListViewData) => (
                <TheatreShowingListPageContent
                    theatre={theatre}
                    totalShowings={totalItems}
                    showings={items}
                    page={page}
                    perPage={SHOWINGS_PER_PAGE}
                    setPage={setPage}
                    setTitle={setTitle}
                />
            )}
        </QueryDataLoader>
    );
}