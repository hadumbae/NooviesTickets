/**
 * @fileoverview Header component for the create movie showing admin page.
 */

import {ReactElement} from "react";
import {MovieDetails} from "@/domains/movies";
import {MovieSummaryHeaderBanner} from "@/views/admin/movies/_comp/movie-summary/MovieSummaryHeaderBanner.tsx";
import {
    CreateMovieShowingPageBreadcrumbs
} from "@/views/admin/movies/_pages/create-showing-page/elements/breadcrumbs.tsx";
import {Link} from "react-router-dom";
import {buttonVariants} from "@/views/shared/_comp/ui";
import {TableOfContents} from "lucide-react";
import {cn} from "@/shared/_feat";

/** Props for the CreateMovieShowingPageHeader component. */
type HeaderProps = {
    movie: MovieDetails;
};

/**
 * Header component for the create movie showing page containing breadcrumbs, a navigation link to existing showings, and a summary banner.
 */
export function CreateMovieShowingPageHeader(
    {movie}: HeaderProps
): ReactElement {
    return (
        <header className="space-y-3">
            <div className="flex justify-between items-center">
                <CreateMovieShowingPageBreadcrumbs
                    slug={movie.slug}
                    title={movie.title}
                />

                <Link
                    to={`/admin/movies/get/${movie.slug}/showings`}
                    className={cn(buttonVariants({variant: "outline", size: "icon"}), "rounded-full")}
                >
                    <TableOfContents />
                </Link>
            </div>

            <MovieSummaryHeaderBanner movie={movie}/>
        </header>
    );
}