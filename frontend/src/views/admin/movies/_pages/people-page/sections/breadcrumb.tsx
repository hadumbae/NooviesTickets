/**
 * @fileoverview Breadcrumb navigation for the movie personnel administration page.
 */

import {ReactElement} from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/views/shared/_comp/ui/breadcrumb.tsx";
import {convertToTitleCase} from "@/shared/_feat/formatters/convertToTitleCase.ts";
import {RoleTypeDepartment} from "@noovies-tickets/common";
import {HoverLink} from "@/views/shared/_feat/navigation/HoverLink.tsx";
import {MovieDetails} from "@/domains/movies";

/** Props for the MoviePersonListBreadcrumb component. */
type PersonListBreadcrumbProps = {
    movie: MovieDetails;
    department: RoleTypeDepartment;
};

/**
 * Renders a breadcrumb trail for navigating between movie lists, movie details, and specific department personnel.
 */
export function MoviePersonListBreadcrumb(
    {movie, department}: PersonListBreadcrumbProps
): ReactElement {
    const {slug, title, releaseDate} = movie;

    const parsedDepartment = convertToTitleCase(department);
    const parsedReleaseYear = releaseDate ? `(${releaseDate.toFormat("yyyy")})` : "";

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <HoverLink to="/admin/movies">
                            All Movies
                        </HoverLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <HoverLink to={`/admin/movies/get/${slug}`}>
                            {`${title} ${parsedReleaseYear}`}
                        </HoverLink>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                <BreadcrumbItem>
                    <BreadcrumbPage>{parsedDepartment}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}