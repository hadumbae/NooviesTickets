/**
 * @fileoverview Header component for the movie showings admin page.
 */

import {ReactElement} from "react";
import {MovieSummary} from "@/domains/movies/_schema/movie/MovieSummarySchema.ts";
import {MovieSummaryHeaderBanner} from "@/views/admin/movies/_comp/movie-summary/MovieSummaryHeaderBanner.tsx";
import {MovieShowingsPageBreadcrumbs} from "@/views/admin/movies/_pages/showings-page/elements/breadcrumbs.tsx";
import {cn} from "@/shared/_feat/handle-ui/cn.ts";
import {buttonVariants} from "@/views/shared/_comp/ui";
import {Plus} from "lucide-react";
import {Link} from "react-router-dom";

/** Props for the MovieShowingsPageHeader component. */
type HeaderProps = {
    movie: MovieSummary;
};

/** Header layout containing breadcrumbs and a summary banner for the movie showings admin page. */
export function MovieShowingsPageHeader(
    {movie}: HeaderProps
): ReactElement {
    return (
        <header className="space-y-3">
            <div className="flex justify-between items-center">
                <MovieShowingsPageBreadcrumbs
                    slug={movie.slug}
                    title={movie.title}
                />

                <Link
                    to={`/admin/movies/get/${movie.slug}/showings/create`}
                    className={cn(buttonVariants({variant: "outline", size: "icon"}), "rounded-full")}
                >
                    <Plus/>
                </Link>
            </div>
            <MovieSummaryHeaderBanner movie={movie}/>
        </header>
    );
}