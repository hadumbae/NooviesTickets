/**
 * @fileoverview Administrative page for managing a specific genre and its associated movie catalog.
 */

import {ReactElement} from 'react';
import {useSetAdminPageTitle} from "@/shared/_feat";
import useParsedPaginationValue from "@/shared/_feat/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import {SlugRouteParamObject} from "@/shared/_schemas/route/SlugRouteParamSchema.ts";
import {GenreDetailsUIContextProvider, GenreDetailsUIPendingContextProvider} from "@/domains/genres/_feat/page-context";
import {GenreDetailsViewData, useFetchGenreDetailsViewData} from "@/domains/genres/_feat/admin-view-data";
import {GenreDetailsPageContent} from "@/views/admin/genres/_pages/genre-details/content.tsx";
import {QueryDataLoader} from "@/views/shared/_feat";
import {GenreDetailsPageProviders} from "@/views/admin/genres/_pages/genre-details/providers.tsx";
import {useLoaderData} from "react-router-dom";

/** Default limit for the paginated movie sub-collection. */
const MOVIES_PER_PAGE = 12;

/**
 * Administrative entry point for the Genre Details view.
 */
export function GenreDetailsPage(): ReactElement {
    const {setTitle} = useSetAdminPageTitle({presetTitle: "Genre"});

    const {value: page, setValue: setPage} =
        useParsedPaginationValue("page", 1);

    const {slug} = useLoaderData<SlugRouteParamObject>();

    const query = useFetchGenreDetailsViewData({
        slug,
        queries: {page, perPage: MOVIES_PER_PAGE},
    });

    return (
        <GenreDetailsUIContextProvider>
            <GenreDetailsUIPendingContextProvider>
                <QueryDataLoader query={query}>
                    {
                        ({genre, details: {movies: {totalItems, items: movies}}}: GenreDetailsViewData) => (
                            <GenreDetailsPageProviders>
                                <GenreDetailsPageContent
                                    genre={genre}
                                    movies={movies}
                                    totalItems={totalItems}
                                    page={page}
                                    perPage={MOVIES_PER_PAGE}
                                    setPage={setPage}
                                    setTitle={setTitle}
                                />
                            </GenreDetailsPageProviders>
                        )
                    }
                </QueryDataLoader>
            </GenreDetailsUIPendingContextProvider>
        </GenreDetailsUIContextProvider>
    );
}
