/**
 * @fileoverview Orchestrates route params and data fetching for movie showings.
 */

import {getUserCountry, useSetPageTitle} from "@/shared/_feat";
import {SlugRouteParamObject} from "@/shared/_schemas/route/SlugRouteParamSchema.ts";
import {useParsedSearchParams} from "@/shared/_feat/fetch-search-params";
import {QueryDataLoader} from "@/views/shared/_feat";
import {MovieInfoShowingsPageContent} from "@/views/client/movies/_pages/movie-showings/content.tsx";
import {
    MovieInfoShowingViewData,
    ShowingsPageQueryStringSchema,
    useFetchMovieInfoShowingsData
} from "@/domains/movies/_feat/client-view-data";
import {useLoaderData} from "react-router-dom";

/** Pagination limit for showing queries. */
const SHOWINGS_PER_PAGE = 20;

/**
 * Resolves search and route params to render a validated movie showings view.
 */
export const MovieInfoShowingsPage = () => {
    const {setTitle} = useSetPageTitle({presetTitle: "Movie Showings"});

    const userCountry = getUserCountry();

    const {slug} = useLoaderData<SlugRouteParamObject>();

    const {
        searchParams: {near, page},
        setSearchParams,
    } = useParsedSearchParams({schema: ShowingsPageQueryStringSchema});

    const setPage = (pageValue: number) => {
        setSearchParams({near, page: pageValue});
    };

    const query = useFetchMovieInfoShowingsData({
        slug,
        queries: {near, page: page ?? 1, perPage: SHOWINGS_PER_PAGE, country: userCountry},
    });

    return (
        <QueryDataLoader query={query}>
            {({movie, showingDetails: {totalItems, items}}: MovieInfoShowingViewData) => {
                return (
                    <MovieInfoShowingsPageContent
                        movie={movie}
                        page={page ?? 1}
                        perPage={SHOWINGS_PER_PAGE}
                        setPage={setPage}
                        showings={items}
                        totalShowings={totalItems}
                        setTitle={setTitle}
                    />
                );
            }}
        </QueryDataLoader>
    );
}

