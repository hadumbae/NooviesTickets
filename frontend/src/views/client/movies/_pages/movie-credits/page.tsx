/**
 * @fileoverview Page component that displays the full cast and crew credits for a specific movie.
 */

import {useSetPageTitle} from "@/shared/_feat";
import {SlugRouteParamObject} from "@/shared/_schemas/route/SlugRouteParamSchema.ts";
import {MovieInfoCreditsPageContent} from "@/views/client/movies/_pages/movie-credits/content.tsx";
import {
    useFetchMovieInfoCreditsData
} from "@/domains/movies/_feat/client-view-data/hooks/useFetchMovieInfoCreditsData.ts";
import {MovieInfoCreditViewData} from "@/domains/movies/_feat/client-view-data";
import {ReactElement} from "react";
import {QueryDataLoader} from "@/views/shared/_feat";
import {useLoaderData} from "react-router-dom";

/**
 * Fetches and renders the movie credits page based on the URL slug.
 */
export function MovieInfoCreditsPage(): ReactElement {
    const {setTitle} = useSetPageTitle({presetTitle: "Movie Credits"});

    const {slug} = useLoaderData<SlugRouteParamObject>();

    const query = useFetchMovieInfoCreditsData({
        slug: slug!,
        options: {enabled: !!slug},
    });

    return (
        <QueryDataLoader query={query}>
            {({movie, creditDetails: {castCredits, crewCredits}}: MovieInfoCreditViewData) => (
                <MovieInfoCreditsPageContent
                    movie={movie}
                    castCredits={castCredits}
                    crewCredits={crewCredits}
                    setTitle={setTitle}
                />
            )}
        </QueryDataLoader>
    );
}
