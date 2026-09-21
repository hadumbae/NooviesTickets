/**
 * @fileoverview Showings tab content for the Movie Details page.
 */

import {ReactElement} from "react";
import {ObjectIdString, SlugString} from "@noovies-tickets/common";
import {PageSectionHeaderLink} from "@/views/shared/_comp/page";
import {generateArraySchema} from "@noovies-tickets/common";
import {EmptyArrayContainer} from "@/views/shared/_comp/text-display/EmptyArrayContainer.tsx";
import {cn} from "@/shared/_feat";
import {QueryDataLoader} from "@/views/shared/_feat";
import {ShowingSummaryCard} from "@/views/admin/showings/_comp/showing-summary-card";
import {useFetchShowings} from "@/domains/showings/_feat/crud-hooks";
import {ShowingDetails, ShowingDetailsSchema} from "@/domains/showings/_schema/showing";

/** Props for the MovieDetailsPageShowingSection component. */
type TabProps = {
    _id: ObjectIdString;
    slug: SlugString;
};

/**
 * Displays a list of screenings for a specific movie with a link to full management.
 */
export function MovieDetailsPageShowingSection(
    {_id, slug}: TabProps
): ReactElement {
    const query = useFetchShowings({
        queries: {movie: _id, sortByStartTime: 1},
        config: {virtuals: true, populate: true, limit: 10},
        schema: generateArraySchema(ShowingDetailsSchema),
    });

    return (
        <div className="space-y-4">
            <PageSectionHeaderLink
                to={`/admin/movies/get/${slug}/showings`}
                text="Showings"
            />

            <QueryDataLoader query={query}>
                {(showings: ShowingDetails[]) => {
                    if (showings.length === 0) {
                        return (
                            <EmptyArrayContainer
                                className="h-28 border rounded-xl"
                                text="There Are No Showings"
                            />
                        );
                    }

                    return (
                        <div className={cn("grid grid-cols-1 gap-2")}>
                            {showings.map((showing) => (
                                <ShowingSummaryCard key={showing._id} showing={showing}/>
                            ))}
                        </div>
                    );
                }}
            </QueryDataLoader>
        </div>
    );
}