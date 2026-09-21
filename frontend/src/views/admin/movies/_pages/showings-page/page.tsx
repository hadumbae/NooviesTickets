/**
 * @fileoverview Admin page component for viewing and managing paginated showings for a specific movie.
 */

import {ReactElement} from "react";
import {useFetchByIdentifierRouteParams, useParsedPaginationValue, useSetAdminPageTitle} from "@/shared/_feat";
import {SlugRouteParamSchema} from "@/shared/_schemas";
import {PageLoader} from "@/views/shared/_comp";
import {useFetchMovieWithShowings} from "@/domains/movies/_feat/admin-view-data";
import {QueryDataLoader} from "@/views/shared/_feat";
import {MovieShowingsPageContent} from "@/views/admin/movies/_pages/showings-page/content.tsx";

const SHOWINGS_PER_PAGE = 10;

/**
 * Admin page component displaying movie details and paginated showings list.
 */
export function MovieShowingsPage(): ReactElement {
    const {setTitle} = useSetAdminPageTitle({presetTitle: "Movie Showings"});

    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/admin/movies",
    }) ?? {};

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    const query = useFetchMovieWithShowings({
        slug: slug!,
        page,
        perPage: SHOWINGS_PER_PAGE,
        options: {enabled: !!slug},
    });

    if (!slug) {
        return <PageLoader/>;
    }

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