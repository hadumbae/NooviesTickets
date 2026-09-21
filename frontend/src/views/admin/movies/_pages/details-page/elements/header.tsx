/**
 * @fileoverview Header component for the Movie Details view that displays metadata and administrative actions.
 */

import {Ellipsis} from "lucide-react";
import {IconButton} from "@/views/shared/_comp";
import {MovieDetails} from "@/domains/movies/_schema/movie/MovieDetailsSchema.ts";
import {MovieDetailsDropdown} from "@/views/admin/movies/_pages/details-page/elements/dropdown.tsx";
import {MovieDetailsBreadcrumb} from "@/views/admin/movies/_pages/details-page/elements/breadcrumbs.tsx";
import {MovieSummaryHeaderBanner} from "@/views/admin/movies/_comp/movie-summary/MovieSummaryHeaderBanner.tsx";

/** Props for the MovieDetailsHeader component. */
type HeaderProps = {
    movie: MovieDetails
}

/**
 * Primary administrative header for a movie profile displaying the poster, titles, and metadata.
 */
export function MovieDetailsHeader({movie}: HeaderProps) {
    const {posterImage, bannerImage, slug} = movie;

    return (
        <header className="flex flex-col">
            <div className="flex justify-between items-center">
                <MovieDetailsBreadcrumb title={movie.title}/>

                <MovieDetailsDropdown slug={slug} hasPoster={!!posterImage} hasBanner={!!bannerImage}>
                    <IconButton icon={Ellipsis}/>
                </MovieDetailsDropdown>
            </div>

            <MovieSummaryHeaderBanner movie={movie}/>
        </header>
    );
}