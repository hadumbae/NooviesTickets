/**
 * @fileoverview Header component for the movie personnel administration page.
 */

import {cn} from "@/shared/_feat";
import {buttonVariants} from "@/views/shared/_comp/ui";
import {convertToTitleCase} from "@/shared/_feat/formatters/convertToTitleCase.ts";
import {HeaderDescription, HeaderTitle} from "@/views/shared/_comp/page-headers";

import {Movie} from "@noovies-tickets/common";
import {RoleTypeDepartment} from "@noovies-tickets/common";
import {LoggedLink} from "@/views/shared/_feat/navigation/LoggedLink.tsx";
import {MoviePersonListBreadcrumb} from "@/views/admin/movies/_pages/people-page/sections/breadcrumb.tsx";

/** Props for the MoviePeopleHeader component. */
type HeaderProps = {
    movie: Movie;
    department: RoleTypeDepartment;
};

/**
 * Administrative header for movie personnel lists providing navigation between cast and crew.
 */
export function MoviePeopleHeader({movie, department}: HeaderProps) {
    const {slug, title} = movie;
    const parsedType = convertToTitleCase(department);

    const isCrew = department === "CREW";
    const isCast = department === "CAST";

    return (
        <header className="space-y-2">
            <MoviePersonListBreadcrumb movie={movie} department={department}/>

            <div className="flex max-md:flex-col max-md:space-y-5 md:justify-between md:items-center">
                <div>
                    <HeaderTitle>{title}</HeaderTitle>
                    <HeaderDescription>{parsedType}</HeaderDescription>
                </div>

                <nav className="flex space-x-2 items-center max-md:justify-center md:justify-end">
                    <LoggedLink to={`/admin/movies/get/${slug}/people/crew`} className={cn(
                        buttonVariants({variant: isCrew ? "outline" : "link"}),
                        isCrew ? "text-purple-600 dark:text-purple-500" : "text-neutral-400"
                    )}>
                        Crew
                    </LoggedLink>

                    <LoggedLink to={`/admin/movies/get/${slug}/people/cast`} className={cn(
                        buttonVariants({variant: isCast ? "outline" : "link"}),
                        isCast ? "text-purple-600 dark:text-purple-500" : "text-neutral-400"
                    )}>
                        Cast
                    </LoggedLink>
                </nav>
            </div>
        </header>
    );
}