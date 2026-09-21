/**
 * @fileoverview Main page component for the Movie Details view.
 */

import {PageLoader} from "@/views/shared/_comp/page";
import {useFetchByIdentifierRouteParams, useSetAdminPageTitle} from "@/shared/_feat";
import {SlugRouteParamSchema} from "@/shared/_schemas/route/SlugRouteParamSchema.ts";
import {MovieDetails, MovieDetailsSchema} from "@/domains/movies/_schema/movie/MovieDetailsSchema.ts";
import {MovieDetailsPageContent} from "@/views/admin/movies/_pages/details-page/content.tsx";
import {QueryDataLoader} from "@/views/shared/_feat";
import {useFetchMovieBySlug} from "@/domains/movies/_feat/crud-hooks";
import {MovieDetailsPageContext} from "@/views/admin/movies/_pages/details-page/context.tsx";

/**
 * Controller component for the movie profile view that fetches data and provides UI context.
 */
export function MovieDetailsPage() {
    const {setTitle} = useSetAdminPageTitle({presetTitle: "Movie"});

    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/admin/movies",
    }) ?? {};

    const query = useFetchMovieBySlug({
        slug: slug!,
        schema: MovieDetailsSchema,
        config: {populate: true, virtuals: true},
        options: {enabled: !!slug}
    });

    if (!slug) {
        return <PageLoader/>;
    }

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