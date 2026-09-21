/**
 * @fileoverview Presentation component for the Movie Details page.
 */

import {ReactElement, useEffect} from 'react';
import {PageFlexWrapper} from "@/views/shared/_comp/page";
import {MovieDetails} from "@/domains/movies/_schema/movie/MovieDetailsSchema.ts";
import {MovieDetailsHeader} from "@/views/admin/movies/_pages/details-page/elements/header.tsx";
import {MovieDetailsCard} from "@/views/admin/movies/_comp/details-display";
import {MovieDetailsPageItemActions} from "@/views/admin/movies/_pages/details-page/actions/itemActions.tsx";
import {SROnly} from "@/views/shared/_comp/screen-readers";
import {MovieDetailsPageCreditSection} from "@/views/admin/movies/_pages/details-page/sections/creditSection.tsx";
import {MovieDetailsPageShowingSection} from "@/views/admin/movies/_pages/details-page/sections/showingSection.tsx";
import {MovieDetailsPageBannerActions, MovieDetailsPagePosterActions} from "@/views/admin/movies/_pages/details-page/actions";

export type MovieDetailsPageContentProps = {
    movie: MovieDetails;
    setTitle: (title: string) => void;
};

/**
 * Renders the primary administrative view for a specific movie.
 */
export function MovieDetailsPageContent(
    {movie, setTitle}: MovieDetailsPageContentProps
): ReactElement {
    useEffect(() => {
        setTitle(movie.title);
    }, [setTitle, movie]);

    return (
        <PageFlexWrapper>
            <MovieDetailsHeader movie={movie}/>

            <section className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
                <div>
                    <SROnly text="Details & Credits"/>
                    <MovieDetailsCard movie={movie}/>
                </div>

                <div className="2xl:col-span-2 space-y-4">
                    <MovieDetailsPageCreditSection _id={movie._id} slug={movie.slug}/>
                    <MovieDetailsPageShowingSection _id={movie._id} slug={movie.slug}/>
                </div>
            </section>

            <MovieDetailsPageItemActions movieID={movie._id} className="hidden"/>
            <MovieDetailsPageBannerActions movieID={movie._id} className="hidden"/>
            <MovieDetailsPagePosterActions movieID={movie._id} className="hidden"/>
        </PageFlexWrapper>
    );
}