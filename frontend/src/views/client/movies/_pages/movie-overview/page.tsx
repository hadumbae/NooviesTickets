/**
 * @fileoverview Container coordinating data loading for the movie overview page.
 */

import {ReactElement} from "react";

import {useSetPageTitle} from "@/shared/_feat";
import {SlugRouteParamObject} from "@/shared/_schemas/route/SlugRouteParamSchema.ts";
import {MovieInfoPageContent} from "@/views/client/movies/_pages/movie-overview/content.tsx";
import {MovieInfoOverviewViewData, useFetchMovieInfoOverviewViewData} from "@/domains/movies/_feat/client-view-data";
import {QueryDataLoader} from "@/views/shared/_feat";
import {useLoaderData} from "react-router-dom";

/** Loads data and renders the movie overview page. */
export function MovieInfoPage(): ReactElement {
    const {setTitle} = useSetPageTitle({presetTitle: "Movie"});

    const {slug} = useLoaderData<SlugRouteParamObject>();
    const query = useFetchMovieInfoOverviewViewData({slug, queries: {reviewPage: 1, reviewPerPage: 3}});

    return (
        <QueryDataLoader query={query}>
            {({movie, credits, reviewDetails}: MovieInfoOverviewViewData) => {
                return (
                    <MovieInfoPageContent
                        movie={movie}
                        credits={credits}
                        reviewDetails={reviewDetails}
                        setTitle={setTitle}
                    />
                );
            }}
        </QueryDataLoader>
    );
}

