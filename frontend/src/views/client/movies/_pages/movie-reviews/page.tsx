/**
 * @fileoverview Container orchestrating data loading for the movie reviews page.
 */

import {ReactElement} from "react";
import {SlugRouteParamObject} from "@/shared/_schemas/route/SlugRouteParamSchema.ts";
import {useSetPageTitle} from "@/shared/_feat";
import useParsedPaginationValue from "@/shared/_feat/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";

import {MovieInfoReviewsPageContent} from "@/views/client/movies/_pages/movie-reviews/content.tsx";
import {QueryDataLoader} from "@/views/shared/_feat";
import {
    useFetchMovieInfoReviewsData
} from "@/domains/movies/_feat/client-view-data/hooks/useFetchMovieInfoReviewsData.ts";
import {useLoaderData} from "react-router-dom";

/** Number of reviews displayed per page */
const REVIEWS_PER_PAGE = 20;

/** Coordinates routing, pagination, and multi-query data loading for movie reviews. */
export function MovieInfoReviewsPage(): ReactElement {
    const {setTitle} = useSetPageTitle({presetTitle: "Movie Reviews"});

    const {slug} = useLoaderData<SlugRouteParamObject>();
    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    const query = useFetchMovieInfoReviewsData({
        slug,
        queries: {
            reviewPage: page,
            reviewPerPage: REVIEWS_PER_PAGE,
        },
    });

    return (
        <QueryDataLoader query={query}>
            {({movie, reviewDetails}) => (
                <MovieInfoReviewsPageContent
                    {...reviewDetails}
                    movie={movie}
                    reviews={reviewDetails.items}
                    page={page}
                    perPage={REVIEWS_PER_PAGE}
                    setPage={setPage}
                    setTitle={setTitle}
                />
            )}
        </QueryDataLoader>
    );
}