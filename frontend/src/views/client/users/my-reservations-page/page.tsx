/**
 * @fileoverview Entry point for the authenticated user's reservations management page.
 */

import useParsedPaginationValue from "@/shared/_feat/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import {MyReservationsPageContent} from "@/views/client/users/my-reservations-page/content.tsx";
import {ReactElement} from "react";
import {QueryDataLoader} from "@/views/shared/_feat";
import {
    CurrentUserReservationsQueryOptionsSchema,
    useFetchReservationsForCurrentUser
} from "@/domains/reservations/_feat";
import {useParsedSearchParams, useSetPageTitle} from "@/shared/_feat";

const RESERVATIONS_PER_PAGE = 20;

/**
 * Orchestrates pagination state and data loading for the authenticated user's reservations.
 */
export function MyReservationsPage(): ReactElement {
    useSetPageTitle({presetTitle: "My Reservations"});

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);
    const {searchParams} = useParsedSearchParams({schema: CurrentUserReservationsQueryOptionsSchema});

    const query = useFetchReservationsForCurrentUser({
        pagination: {page, perPage: RESERVATIONS_PER_PAGE},
        queries: searchParams,
    });

    return (
        <QueryDataLoader query={query}>
            {({totalItems, items: reservations}) => (
                <MyReservationsPageContent
                    page={page}
                    perPage={RESERVATIONS_PER_PAGE}
                    setPage={setPage}
                    reservations={reservations}
                    totalReservations={totalItems}
                />
            )}
        </QueryDataLoader>
    );
}