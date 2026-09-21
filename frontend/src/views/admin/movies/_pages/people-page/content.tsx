/** @fileoverview Layout component for managing movie credits with a split-view dashboard. */

import {ReactElement, useEffect} from "react";
import {PageFlexWrapper} from "@/views/shared/_comp/page";
import {MoviePeopleHeader} from "@/views/admin/movies/_pages/people-page/sections";
import {
    MoviePeoplePageFormSection
} from "@/views/admin/movies/_pages/people-page/sections/MoviePeoplePageFormSection.tsx";
import {
    MoviePeoplePageCreditSection
} from "@/views/admin/movies/_pages/people-page/sections/MoviePeoplePageCreditSection.tsx";

import {RoleTypeDepartment} from "@noovies-tickets/common";
import {convertToTitleCase} from "@/shared/_feat";
import {MovieDetails} from "@/domains/movies/_schema/movie/MovieDetailsSchema.ts";

/** Props for the MoviePeoplePageContent component. */
type ContentProps = {
    movie: MovieDetails;
    department: RoleTypeDepartment;
    page: number;
    perPage: number;
    setPage: (page: number) => void;
    setTitle: (title: string) => void;
};

/** Renders a submission form and a paginated list of credits for a specific movie department. */
export function MoviePeoplePageContent(
    {movie, department, page, perPage, setPage, setTitle}: ContentProps
): ReactElement {
    useEffect(() => {
        const dept = convertToTitleCase(department);
        setTitle(`${movie.title} • ${dept}`);
    }, [movie, department, setTitle]);

    return (
        <PageFlexWrapper className="space-y-6">
            <MoviePeopleHeader movie={movie} department={department}/>

            <div className="grid max-md:grid-cols-1 md:grid-cols-3 md:gap-4 gap-6">
                <MoviePeoplePageFormSection
                    department={department}
                    movieID={movie._id}
                />

                <MoviePeoplePageCreditSection
                    className="md:col-span-2"
                    department={department}
                    page={page}
                    perPage={perPage}
                    setPage={setPage}
                />
            </div>
        </PageFlexWrapper>
    );
}