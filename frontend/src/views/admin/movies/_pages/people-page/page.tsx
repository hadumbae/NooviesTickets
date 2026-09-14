/**
 * @fileoverview Page component for managing movie credits filtered by department.
 */

import {ReactElement} from "react";
import {PageLoader} from "@/views/shared/_comp/page";
import {
    useFetchByIdentifierRouteParams
} from "@/shared/_feat";
import {SlugRouteParamSchema} from "@/shared/_schemas/route/SlugRouteParamSchema.ts";
import {QueryDataLoader} from "@/views/shared/_feat";
import useParsedPaginationValue from "@/shared/_feat/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import {MoviePeoplePageContent} from "@/views/admin/movies/_pages/people-page/content.tsx";

import {RoleTypeDepartment} from "@noovies-tickets/common";
import {Movie, MovieSchema} from "@/domains/movies/_schema/movie/MovieSchema.ts";
import {useFetchMovieBySlug} from "@/domains/movies/_feat/crud-hooks/fetch/useFetchMovieBySlug.ts";

/** Props for the MoviePeoplePage component. */
type PeoplePageProps = {
    department: RoleTypeDepartment;
};

const CREDITS_PER_PAGE = 20;

/** Controller component that validates the movie slug and initiates the data fetching sequence for movie credits. */
export function MoviePeoplePage(
    {department}: PeoplePageProps
): ReactElement {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/admin/movies",
        sourceComponent: MoviePeoplePage.name,
    }) ?? {};

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    const query = useFetchMovieBySlug({
        schema: MovieSchema,
        slug: slug!,
        options: {enabled: !!slug},
    });

    if (!slug) {
        return <PageLoader/>;
    }

    return (
        <QueryDataLoader query={query}>
            {(movie: Movie) => (
                <MoviePeoplePageContent
                    page={page}
                    perPage={CREDITS_PER_PAGE}
                    setPage={setPage}
                    movie={movie}
                    department={department}
                />
            )}
        </QueryDataLoader>
    );
}