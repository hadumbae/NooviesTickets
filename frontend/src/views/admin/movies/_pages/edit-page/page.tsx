/**
 * @fileoverview Main page component for the movie editing interface in the admin dashboard.
 */

import {SlugRouteParamObject} from "@/shared/_schemas/route/SlugRouteParamSchema.ts";
import {Movie, MovieSchema} from "@noovies-tickets/common";
import {MovieEditPageContent} from "@/views/admin/movies/_pages/edit-page/content.tsx";
import {ReactElement} from "react";
import {QueryDataLoader} from "@/views/shared/_feat";
import {useFetchMovieBySlug} from "@/domains/movies/_feat/crud-hooks";
import {useLoaderData} from "react-router-dom";

/**
 * Controller component that fetches movie data by slug for the edit view.
 */
export function MovieEditPage(): ReactElement {
    const {slug} = useLoaderData<SlugRouteParamObject>();

    const query = useFetchMovieBySlug({
        slug,
        schema: MovieSchema,
        config: {populate: false, virtuals: false},
    });

    return (
        <QueryDataLoader query={query}>
            {(movie: Movie) => <MovieEditPageContent movie={movie}/>}
        </QueryDataLoader>
    )
}