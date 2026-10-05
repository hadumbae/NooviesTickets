/**
 * @fileoverview Section component for displaying featured movie genres on the client homepage.
 */

import {ReactElement} from "react";
import {GenreSummary} from "@/domains/genres/_schema/genre/GenreSummarySchema.ts";
import {EmptyArrayContainer, PageSectionHeader} from "@/views/shared/_comp";
import {HomepageFeaturedReviewList} from "@/views/client/homepage/_comp";

/** Props for the HomepageGenresSection component. */
type SectionProps = {
    genres: GenreSummary[];
};

/** Displays a list of featured genres with their associated movie previews. */
export function HomepageGenresSection(
    {genres}: SectionProps
): ReactElement {
    return (
        <section className="space-y-4">
            <PageSectionHeader text="Featured Genres"/>

            {
                genres.length > 0 ? (
                    genres.map((genre) => (
                        <HomepageFeaturedReviewList
                            key={genre._id}
                            genre={genre}
                        />
                    ))
                ) : (
                    <EmptyArrayContainer
                        className="h-52 rounded-container-border"
                        text="Currently No Featured Genres"
                    />
                )
            }
        </section>
    );
}