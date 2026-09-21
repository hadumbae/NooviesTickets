import {ReactElement} from "react";
import {useSetAdminPageTitle} from "@/shared/_feat";
import {SlugRouteParamObject} from "@/shared/_schemas";
import {useLoaderData} from "react-router-dom";
import {MovieDetailsSchema, useFetchMovieBySlug} from "@/domains/movies";
import {QueryDataLoader} from "@/views/shared/_feat";
import {MovieCreateShowingPageContent} from "@/views/admin/movies/_pages/create-showing-page/content.tsx";

export function MovieCreateShowingPage(): ReactElement {
    const {slug} = useLoaderData<SlugRouteParamObject>();
    const {setTitle} = useSetAdminPageTitle({presetTitle: "Create Showing For Movie"});

    const query = useFetchMovieBySlug({
        slug,
        schema: MovieDetailsSchema,
        config: {populate: true, virtuals: true},
    });

    return (
        <QueryDataLoader query={query}>
            {(movie) => (
                <MovieCreateShowingPageContent
                    movie={movie}
                    setTitle={setTitle}
                />
            )}
        </QueryDataLoader>
    );
}