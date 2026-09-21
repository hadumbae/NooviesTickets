/**
 * @fileoverview Controller component for the administrative movie library index page.
 */

import {usePaginationLocationState} from "@/shared/_feat/navigation/usePaginationLocationState.ts";
import useParsedPaginationValue from "@/shared/_feat/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import {MovieIndexPageContent} from "@/views/admin/movies/_pages/index-page/content.tsx";
import {PaginatedItems} from "@/shared/_types";
import {MovieDetails, MovieDetailsSchema} from "@/domains/movies/_schema/movie";
import {generatePaginationSchema} from "@noovies-tickets/common";
import {QueryDataLoader} from "@/views/shared/_feat";
import {useFetchPaginatedMovies} from "@/domains/movies/_feat/crud-hooks";
import {useMovieIndexQueryOptionsContext} from "@/domains/movies/_feat/handle-query-options/movie-index/MovieIndexQueryOptionsContext.ts";
import {useSetAdminPageTitle} from "@/shared/_feat";

const MOVIES_PER_PAGE = 20;

/**
 * Orchestrates data fetching and state management for the movie library index.
 */
export function MovieIndexPage() {
    useSetAdminPageTitle({presetTitle: "Movies"})

    const {data: paginationState} = usePaginationLocationState();
    const {value: page, setValue: setPage} = useParsedPaginationValue("page", paginationState?.page ?? 1);
    const {values: searchParams} = useMovieIndexQueryOptionsContext();

    const query = useFetchPaginatedMovies({
        page,
        perPage: MOVIES_PER_PAGE,
        queries: searchParams,
        config: {populate: true, virtuals: true},
        schema: generatePaginationSchema(MovieDetailsSchema),
    });

    return (
        <QueryDataLoader query={query}>
            {({totalItems, items}: PaginatedItems<MovieDetails>) => (
                <MovieIndexPageContent
                    page={page}
                    perPage={MOVIES_PER_PAGE}
                    setPage={setPage}
                    movies={items}
                    totalItems={totalItems}
                />
            )}
        </QueryDataLoader>
    );
}