/**
 * @fileoverview Admin index page for browsing and managing persons.
 * Orchestrates URL state synchronization, paginated data retrieval,
 * and schema validation for the administrative person management interface.
 */

import {ReactElement} from 'react';
import {usePaginationLocationState} from "@/shared/_feat/navigation/usePaginationLocationState.ts";
import useParsedPaginationValue from "@/shared/_feat/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import {QueryDataLoader} from "@/views/shared/_feat";
import {useFetchPaginatedPersons} from "@/domains/persons/_feat/crud-hooks";
import {PersonIndexPageContent} from "@/views/admin/persons/_pages/index-page/content.tsx";
import {generatePaginationSchema, Person, PersonSchema} from "@noovies-tickets/common";
import {PaginatedItems} from "@/shared/_types";
import {
    usePersonIndexQueryOptionsContext
} from "@/domains/persons/_feat/validate-query-options/person-index/PersonIndexQueryOptionsContext.ts";
import {useSetAdminPageTitle} from "@/shared/_feat";

/** Default result set size for the person administrative grid. */
const PERSONS_PER_PAGE = 20;

/**
 * Orchestrator component for the Persons Index view.
 */
export function PersonIndexPage(): ReactElement {
    useSetAdminPageTitle({presetTitle: "Persons"});

    const {data: paginationState} = usePaginationLocationState();
    const {value: page, setValue: setPage} = useParsedPaginationValue("page", paginationState?.page);
    const {values: searchParams} = usePersonIndexQueryOptionsContext();

    const query = useFetchPaginatedPersons({
        page,
        perPage: PERSONS_PER_PAGE,
        schema: generatePaginationSchema(PersonSchema),
        queries: searchParams,
        config: {populate: true, virtuals: true}
    });

    return (
        <QueryDataLoader query={query}>
            {({totalItems, items: persons}: PaginatedItems<Person>) => (
                <PersonIndexPageContent
                    persons={persons}
                    page={page}
                    perPage={PERSONS_PER_PAGE}
                    totalItems={totalItems}
                    setPage={setPage}
                />
            )}
        </QueryDataLoader>
    );
}