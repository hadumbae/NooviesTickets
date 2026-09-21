/**
 * @fileoverview Content component for the movie credits page displaying organized cast and crew lists.
 */

import {ReactElement, useEffect, useMemo} from "react";
import {PageFlexWrapper} from "@/views/shared/_comp/page";
import {MovieInfoHeader} from "@/views/client/movies/_comp";
import {
    MovieInfoCastCreditsSection,
    MovieInfoCreditListSection,
} from "@/views/client/movies/_pages/movie-credits/sections";

import {buildFullCreditListByCategoryOrder} from "@/domains/movies/_feat/manage-credits-page/buildFullCreditListByCategoryOrder.ts";
import {MovieDetails} from "@/domains/movies/_schema/movie/MovieDetailsSchema.ts";
import {CastCreditExceptMovie, GroupedCrewCreditsExceptMovie} from "@/domains/movie-credits";

/** Props for the MovieInfoCreditsPageContent component. */
type ContentProps = {
    movie: MovieDetails;
    castCredits: CastCreditExceptMovie[];
    crewCredits: GroupedCrewCreditsExceptMovie[];
    setTitle: (title: string) => void;
}

/** Renders the full list of cast and crew credits for a specific movie. */
export function MovieInfoCreditsPageContent(
    {movie, castCredits, crewCredits, setTitle}: ContentProps
): ReactElement {
    const {title, slug, posterImage} = movie;

    const organisedList = useMemo(
        () => buildFullCreditListByCategoryOrder({castCredits, crewDetails: crewCredits}),
        [castCredits, crewCredits]
    );

    useEffect(() => {
        setTitle(`${movie.title} • Cast & Crew`);
    }, [movie, setTitle]);

    return (
        <PageFlexWrapper className="space-y-8">
            <MovieInfoHeader
                posterURL={posterImage?.secure_url}
                movieSlug={slug}
                movieTitle={title}
                pageText="Cast & Crew"
            />

            {organisedList.map(([category, credits]) => {
                if (category === "Cast") {
                    return (
                        <MovieInfoCastCreditsSection
                            key={`${category}-${credits.length}`}
                            cast={credits as CastCreditExceptMovie[]}
                        />
                    );
                }

                return (
                    <MovieInfoCreditListSection
                        key={`${category}-${credits.length}`}
                        category={category}
                        credits={credits}
                    />
                );
            })}
        </PageFlexWrapper>
    );
}