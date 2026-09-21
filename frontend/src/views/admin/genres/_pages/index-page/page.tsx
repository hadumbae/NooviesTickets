/**
 * @fileoverview Administrative page for managing and listing movie genres.
 *
 */

import {ReactElement} from 'react';
import {useSetAdminPageTitle} from "@/shared/_feat";
import {usePaginationLocationState} from "@/shared/_feat/navigation/usePaginationLocationState.ts";
import {useFetchPaginatedGenres} from "@/domains/genres/_feat/crud-hooks";
import {QueryDataLoader} from "@/views/shared/_feat";
import {GenreIndexPageContent} from "@/views/admin/genres/_pages/index-page/content.tsx";
import {useParsedPaginationValue} from "@/shared/_feat/fetch-pagination-search-params";
import {generatePaginationSchema, Genre, GenreSchema} from "@noovies-tickets/common";
import {PaginatedItems} from "@/shared/_types";
import {
    useGenreIndexQueryOptionsContext
} from "@/domains/genres/_feat/handle-query-options/genre-index/GenreIndexQueryOptionsContext.ts";

const GENRES_PER_PAGE = 20;

/**
 * Entry point for the Genre management index page.
 */
export function GenreIndexPage(): ReactElement {
    useSetAdminPageTitle({presetTitle: "Genres"});

    const {data: paginationState} = usePaginationLocationState();
    const {value: page, setValue: setPage} = useParsedPaginationValue("page", paginationState?.page ?? 1);
    const {values} = useGenreIndexQueryOptionsContext();

    const query = useFetchPaginatedGenres({
        page,
        perPage: GENRES_PER_PAGE,
        queries: values,
        schema: generatePaginationSchema(GenreSchema),
        config: {virtuals: true, populate: true},
    });

    return (
        <QueryDataLoader query={query}>
            {({totalItems, items}: PaginatedItems<Genre>) => (
                <GenreIndexPageContent
                    genres={items}
                    totalItems={totalItems}
                    page={page}
                    perPage={GENRES_PER_PAGE}
                    setPage={setPage}
                />
            )}
        </QueryDataLoader>
    );
}
