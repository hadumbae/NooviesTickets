/**
 * @fileoverview Presentational layout for the movie reviews page.
 */

import {ReactElement, useEffect} from "react";
import {PageFlexWrapper} from "@/views/shared/_comp/page";

import {MovieDetails} from "@/domains/movies/_schema/movie/MovieDetailsSchema.ts";
import {MovieReviewDetails} from "@/domains/movie-reviews";
import {MovieInfoReviewAction, MovieInfoReviewsPageHeader} from "@/views/client/movies/_pages/movie-reviews/elements";
import {
    MovieInfoFeaturedReviewsSection,
    MovieInfoReviewListSection,
} from "@/views/client/movies/_pages/movie-reviews/sections";

/** Props for the MovieInfoReviewsPageContent component. */
type ContentProps = {
    totalItems: number;
    reviews: MovieReviewDetails[];
    userReview: MovieReviewDetails | null;
    averageRating: number | null;
    movie: MovieDetails;
    page: number;
    perPage: number;
    setPage: (page: number) => void;
    setTitle: (title: string) => void;
};

/** Renders the structured layout and sections for the movie reviews view. */
export function MovieInfoReviewsPageContent(
    {movie, totalItems, reviews, userReview, setTitle, ...paginationProps}: ContentProps
): ReactElement {
    const {_id: movieID, title: movieTitle, posterImage, slug: movieSlug} = movie;

    useEffect(() => {
        setTitle(`${movie.title} Reviews`);
    }, [movie, setTitle]);

    return (
        <PageFlexWrapper>
            <MovieInfoReviewsPageHeader
                posterURL={posterImage?.secure_url}
                movieTitle={movieTitle}
                movieSlug={movieSlug}
            />

            <MovieInfoReviewAction
                userReview={userReview}
                totalReviews={totalItems}
                movieID={movieID}
            />

            <MovieInfoFeaturedReviewsSection
                movieID={movieID}
            />

            <MovieInfoReviewListSection
                reviews={reviews}
                totalItems={totalItems}
                {...paginationProps}
            />
        </PageFlexWrapper>
    );
}