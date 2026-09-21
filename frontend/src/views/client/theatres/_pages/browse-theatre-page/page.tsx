/**
 * @fileoverview Public page for browsing theatres by location that have active showings.
 */

import {ReactElement} from "react";
import {useSetPageTitle} from "@/shared/_feat";
import {QueryDataLoader} from "@/views/shared/_feat";
import useParsedPaginationValue from "@/shared/_feat/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import {PaginatedItems} from "@/shared/_types";

import {TheatreWithRecentShowings} from "@/domains/theatres/_schema/theatre/TheatreWithRecentShowingsSchema.ts";
import {useFetchTheatresByLocation} from "@/domains/theatres/_feat/search-theatres/fetch/useFetchTheatresByLocation.ts";
import {
    useTheatreLocationQueryOptionsContext
} from "@/domains/theatres/_feat/handle-query-options/theatre-location/TheatreLocationQueryOptionsContext.ts";
import {BrowseTheatreListPageContent} from "@/views/client/theatres/_pages/browse-theatre-page/content.tsx";

const THEATRES_PER_PAGE = 20;

/**
 * Top-level theatre browse page that coordinates search parameter parsing and paginated data fetching.
 */
export function BrowseTheatreListPage(): ReactElement {
    useSetPageTitle({presetTitle: "Browse Theatres"});

    const {values: queryOptions} = useTheatreLocationQueryOptionsContext();
    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    const query = useFetchTheatresByLocation({
        page,
        perPage: THEATRES_PER_PAGE,
        target: queryOptions.target,
        country: queryOptions.country,
    });

    return (
        <QueryDataLoader query={query}>
            {({totalItems, items}: PaginatedItems<TheatreWithRecentShowings>) => (
                <BrowseTheatreListPageContent
                    page={page}
                    perPage={THEATRES_PER_PAGE}
                    totalTheatres={totalItems}
                    setPage={setPage}
                    theatres={items}
                />
            )}
        </QueryDataLoader>
    );
}