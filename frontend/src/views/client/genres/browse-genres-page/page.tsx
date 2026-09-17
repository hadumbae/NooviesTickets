/**
 * @fileoverview Entry point for the public-facing Genres browsing page.
 *
 */

import {ReactElement} from "react";
import {useFetchGenres} from "@/domains/genres/_feat/crud-hooks/fetch/useFetchGenres.ts";
import {QueryDataLoader} from "@/views/shared/_feat";
import {BrowseGenresPageContent} from "@/views/client/genres/browse-genres-page/content.tsx";
import {useTitle} from "@/shared/_feat";
import {Genre, GenreSchema, generateArraySchema} from "@noovies-tickets/common";

/**
 * Page component that fetches and displays a list of movie genres.
 */
export function BrowseGenresPage(): ReactElement {
    useTitle("Browse Genres");

    const query = useFetchGenres({
        schema: generateArraySchema(GenreSchema),
        config: {populate: false, virtuals: false},
    });

    return (
        <QueryDataLoader query={query}>
            {(genres: Genre[]) => <BrowseGenresPageContent genres={genres}/>}
        </QueryDataLoader>
    );
}