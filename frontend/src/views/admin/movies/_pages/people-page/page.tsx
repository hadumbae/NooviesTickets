/**
 * @fileoverview Page component for managing movie credits filtered by department.
 */

import {ReactElement} from "react";
import {useSetAdminPageTitle} from "@/shared/_feat";
import {SlugRouteParamObject} from "@/shared/_schemas/route/SlugRouteParamSchema.ts";
import {QueryDataLoader} from "@/views/shared/_feat";
import useParsedPaginationValue from "@/shared/_feat/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import {MoviePeoplePageContent} from "@/views/admin/movies/_pages/people-page/content.tsx";

import {RoleTypeDepartment} from "@noovies-tickets/common";
import {useFetchMovieBySlug} from "@/domains/movies/_feat/crud-hooks/fetch/useFetchMovieBySlug.ts";
import {useLoaderData} from "react-router-dom";
import {MovieDetails, MovieDetailsSchema} from "@/domains/movies/_schema/movie/MovieDetailsSchema.ts";

/** Props for the MoviePeoplePage component. */
type PeoplePageProps = {
    department: RoleTypeDepartment;
};

const CREDITS_PER_PAGE = 20;

/** Controller component that validates the movie slug and initiates the data fetching sequence for movie credits. */
export function MoviePeoplePage(
    {department}: PeoplePageProps
): ReactElement {
    const {setTitle} = useSetAdminPageTitle({presetTitle: "Movie Credits"});
    const {slug} = useLoaderData<SlugRouteParamObject>();

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    const query = useFetchMovieBySlug({
        slug: slug,
        schema: MovieDetailsSchema,
        config: {populate: true, virtuals: true},
    });

    return (
        <QueryDataLoader query={query}>
            {(movie: MovieDetails) => (
                <MoviePeoplePageContent
                    page={page}
                    perPage={CREDITS_PER_PAGE}
                    setPage={setPage}
                    movie={movie}
                    department={department}
                    setTitle={setTitle}
                />
            )}
        </QueryDataLoader>
    );
}