/**
 * @fileoverview Admin page component for viewing and managing paginated showings for a specific movie.
 */

import {ReactElement} from "react";
import {useParsedPaginationValue, useSetAdminPageTitle} from "@/shared/_feat";
import {SlugRouteParamObject} from "@/shared/_schemas";
import {useFetchMovieWithShowings} from "@/domains/movies/_feat/admin-view-data";
import {QueryDataLoader} from "@/views/shared/_feat";
import {MovieShowingsPageContent} from "@/views/admin/movies/_pages/showings-page/content.tsx";
import {useLoaderData} from "react-router-dom";

const SHOWINGS_PER_PAGE = 10;

/**
 * Admin page component displaying movie details and paginated showings list.
 */
export function MovieShowingsPage(): ReactElement {
    const {setTitle} = useSetAdminPageTitle({presetTitle: "Movie Showings"});

    const {slug} = useLoaderData<SlugRouteParamObject>();

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    const query = useFetchMovieWithShowings({
        slug,
        page,
        perPage: SHOWINGS_PER_PAGE,
    });

    return (
        <QueryDataLoader query={query}>
            {({movie, showings: {totalItems, items: showings}}) => (
                <MovieShowingsPageContent
                    movie={movie}
                    showings={showings}
                    totalItems={totalItems}
                    page={page}
                    perPage={SHOWINGS_PER_PAGE}
                    setPage={setPage}
                    setTitle={setTitle}
                />
            )}
        </QueryDataLoader>
    );
}