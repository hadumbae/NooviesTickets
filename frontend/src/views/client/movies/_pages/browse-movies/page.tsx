/**
 * @fileoverview Page component for browsing and paginating through the movie catalog.
 */

import {ReactElement} from 'react';
import {PaginatedItems} from "@/shared/_types";
import {QueryDataLoader} from "@/views/shared/_feat";
import {useParsedPaginationValue} from "@/shared/_feat/fetch-pagination-search-params";
import {generatePaginationSchema} from "@noovies-tickets/common";

import {MovieDetails, MovieDetailsSchema} from "@/domains/movies/_schema/movie/MovieDetailsSchema.ts";
import {useFetchPaginatedMovies} from "@/domains/movies/_feat/crud-hooks/fetch/useFetchPaginatedMovies.ts";
import {BrowseMoviesPageContent} from "@/views/client/movies/_pages/browse-movies/content.tsx";
import {useSetPageTitle} from "@/shared/_feat";

/** The number of movie items displayed per page. */
const MOVIES_PER_PAGE = 25;

/** Renders the movie browsing page with pagination and data validation. */
export function BrowseMoviesPage(): ReactElement {
    useSetPageTitle({presetTitle: "Browse Movies"});

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    const query = useFetchPaginatedMovies({
        schema: generatePaginationSchema(MovieDetailsSchema),
        page: page,
        perPage: 25,
        config: {populate: true, virtuals: true},
    });

    return (
        <QueryDataLoader query={query}>
            {({totalItems, items: movies}: PaginatedItems<MovieDetails>) => (
                <BrowseMoviesPageContent
                    movies={movies}
                    totalMovies={totalItems}
                    page={page}
                    perPage={MOVIES_PER_PAGE}
                    setPage={setPage}
                />
            )}
        </QueryDataLoader>
    );
}
