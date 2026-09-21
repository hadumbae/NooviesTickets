/**
 * @fileoverview Header component for the movie personnel administration page.
 */

import {cn} from "@/shared/_feat";
import {buttonVariants} from "@/views/shared/_comp/ui";

import {RoleTypeDepartment} from "@noovies-tickets/common";
import {LoggedLink} from "@/views/shared/_feat/navigation/LoggedLink.tsx";
import {MoviePersonListBreadcrumb} from "@/views/admin/movies/_pages/people-page/sections/breadcrumb.tsx";
import {MovieSummaryHeaderBanner} from "@/views/admin/movies";
import {MovieDetails} from "@/domains/movies";

/** Props for the MoviePeopleHeader component. */
type HeaderProps = {
    movie: MovieDetails;
    department: RoleTypeDepartment;
};

/**
 * Administrative header for movie personnel lists providing navigation between cast and crew.
 */
export function MoviePeopleHeader({movie, department}: HeaderProps) {
    const {slug} = movie;

    const isCrew = department === "CREW";
    const isCast = department === "CAST";

    return (
        <header className="space-y-2">
            <div className="flex max-md:flex-col max-md:space-y-2 md:justify-between md:items-center">
                <MoviePersonListBreadcrumb movie={movie} department={department}/>

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


            <MovieSummaryHeaderBanner movie={movie}/>
        </header>
    );
}