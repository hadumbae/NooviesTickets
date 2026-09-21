/**
 * @fileoverview Layout composition for the movie overview page.
 */

import {ReactElement, useEffect} from "react";
import {PageFlexWrapper} from "@/views/shared/_comp/page";

import {MovieDetails} from "@/domains/movies/_schema/movie/MovieDetailsSchema.ts";
import {MovieReviewSummaryData} from "@/domains/movie-reviews";
import {MovieCreditDetails} from "@/domains/movie-credits";
import {MovieOverviewFavouriteToggle, MovieOverviewHeader} from "@/views/client/movies/_pages/movie-overview/elements";
import {
    MovieOverviewCredits,
    MovieOverviewEditorialInfo,
    MovieOverviewReviews,
    MovieOverviewShowings
} from "@/views/client/movies/_pages/movie-overview/sections";


/** Props for the MovieInfoPageContent component. */
type ContentProps = {
    movie: MovieDetails;
    credits: MovieCreditDetails[];
    reviewDetails: MovieReviewSummaryData;
    setTitle: (title: string) => void;
};

/**
 * Renders the movie overview page sections including header, credits, and reviews.
 */
export function MovieInfoPageContent(
    {movie, credits, reviewDetails: {averageRating, userReview, items: reviews}, setTitle}: ContentProps
): ReactElement {
    useEffect(() => {
        setTitle(movie.title);
    }, [movie, setTitle]);

    return (
        <PageFlexWrapper className="space-y-10">
            <MovieOverviewHeader
                movie={movie}
                credits={credits}
            />

            <MovieOverviewFavouriteToggle
                movieID={movie._id}
            />

            <MovieOverviewEditorialInfo
                movie={movie}
            />

            <MovieOverviewCredits
                movie={movie}
                credits={credits}
            />

            <MovieOverviewReviews
                movie={movie}
                averageRating={averageRating}
                userReview={userReview}
                reviews={reviews}
            />

            <MovieOverviewShowings
                movieSlug={movie.slug}
            />
        </PageFlexWrapper>
    );
}