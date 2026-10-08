/**
 * @fileoverview Main page component for the Movie Details view.
 */

import {useSetAdminPageTitle} from "@/shared/_feat";
import {SlugRouteParamObject} from "@/shared/_schemas/route/SlugRouteParamSchema.ts";
import {MovieDetails, MovieDetailsSchema} from "@/domains/movies/_schema/movie/MovieDetailsSchema.ts";
import {MovieDetailsPageContent} from "@/views/admin/movies/_pages/details-page/content.tsx";
import {QueryDataLoader} from "@/views/shared/_feat";
import {useFetchMovieBySlug} from "@/domains/movies/_feat/crud-hooks";
import {MovieDetailsPageContext} from "@/views/admin/movies/_pages/details-page/context.tsx";
import {useLoaderData} from "react-router-dom";

/**
 * Controller component for the movie profile view that fetches data and provides UI context.
 */
export function MovieDetailsPage() {
    const {setTitle} = useSetAdminPageTitle({presetTitle: "Movie"});

    const {slug} = useLoaderData<SlugRouteParamObject>();

    const query = useFetchMovieBySlug({
        slug,
        schema: MovieDetailsSchema,
        config: {populate: true, virtuals: true},
    });

    return (
        <QueryDataLoader query={query}>
            {(movie: MovieDetails) => (
                <MovieDetailsPageContext>
                    <MovieDetailsPageContent movie={movie} setTitle={setTitle}/>
                </MovieDetailsPageContext>
            )}
        </QueryDataLoader>
    );
}