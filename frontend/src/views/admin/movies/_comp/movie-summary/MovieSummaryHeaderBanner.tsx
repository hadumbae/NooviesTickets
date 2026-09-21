/**
 * @fileoverview Header banner component displaying a summary of movie details including poster, title, and metadata.
 */

import {ReactElement} from "react";
import {MovieSummary} from "@/domains/movies/_schema/movie/MovieSummarySchema.ts";
import {Image} from "@/views/shared/_comp/images/Image.tsx";
import {formatMovieRuntime} from "@/domains/movies";
import {MovieMetaGenreBadges} from "@/views/admin/movies";

/** Props for the MovieSummaryHeaderBanner component. */
type CardProps = {
    movie: MovieSummary;
};

/**
 * Header banner displaying key movie information such as poster, release year, runtime, and genres.
 */
export function MovieSummaryHeaderBanner(
    {movie}: CardProps
): ReactElement {
    const {title, releaseDate, runtime, tagline, genres, posterImage} = movie;

    const releaseYear = releaseDate?.toFormat("yyyy") ?? "Unreleased";
    const duration = formatMovieRuntime(runtime, true);

    return (
        <div className="flex space-x-3">
            <Image
                src={posterImage?.secure_url}
                alt="Poster Image"
                className="aspect-[2/3] h-36"
            />

            <div className="flex-grow grid grid-cols-1 gap-1">
                <div>
                    <h1 className="page-title">{title}</h1>
                    <h2 className="page-subtitle">{releaseYear} • {duration}</h2>
                </div>

                <div className="space-y-1 flex flex-col justify-center">
                    <p className="page-description italic">"{tagline}"</p>
                    <MovieMetaGenreBadges genres={genres}/>
                </div>
            </div>
        </div>
    );
}