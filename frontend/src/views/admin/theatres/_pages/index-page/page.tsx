/**
 * @fileoverview Main administrative directory for cinema locations.
 */

import {ReactElement} from "react";
import {useTitle} from "@/shared/_feat";
import {useParsedSearchParams} from "@/shared/_feat/fetch-search-params";
import {TheatreIndexPageContent} from "@/views/admin/theatres/_pages/index-page/content.tsx";
import useParsedPaginationValue from "@/shared/_feat/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import {
    QueryErrorBoundary
} from "@/views/shared/_feat/error-boundary/query-error-fallback/boundary/QueryErrorBoundary.tsx";
import {TheatreHttpStatusOverrideText} from "@/domains/theatres/_const/TheatreHttpStatusOverrideText.ts";
import {useFetchPaginatedTheatres} from "@/domains/theatres/_feat/crud-hooks";
import {QueryDataLoader} from "@/views/shared/_feat";
import {generatePaginationSchema} from "@noovies-tickets/common";
import {PaginatedItems} from "@/shared/_types";

import {TheatreDetails, TheatreDetailsSchema} from "@/domains/theatres/_schema/theatre";
import {TheatreQueryOptionsSchema} from "@/domains/theatres/_feat/handle-query-options/options/TheatreQueryOptionsSchema.ts";

/** Default number of theatre records displayed per pagination page. */
const THEATRES_PER_PAGE = 20;

/**
 * Root page component for the Theatre Management index view.
 */
export function TheatreIndexPage(): ReactElement {
    useTitle("Admin | Theatre Management");

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);
    const {searchParams} = useParsedSearchParams({schema: TheatreQueryOptionsSchema});

    const query = useFetchPaginatedTheatres({
        schema: generatePaginationSchema(TheatreDetailsSchema),
        page,
        perPage: THEATRES_PER_PAGE,
        queries: searchParams,
        config: {virtuals: true, populate: true},
    });

    return (
        <QueryErrorBoundary statusTextOverride={TheatreHttpStatusOverrideText}>
            <QueryDataLoader query={query}>
                {(data: PaginatedItems<TheatreDetails>) => (
                    <TheatreIndexPageContent
                        theatres={data.items}
                        totalItems={data.totalItems}
                        page={page}
                        perPage={THEATRES_PER_PAGE}
                        setPage={setPage}
                    />
                )}
            </QueryDataLoader>
        </QueryErrorBoundary>
    );
}