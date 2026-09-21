/**
 * @fileoverview Main content layout and pagination container for the movie showings admin page.
 */

import {ReactElement, useEffect} from "react";
import {MovieShowingSummary} from "@/domains/showings";
import {MovieSummary} from "@/domains/movies/_schema/movie/MovieSummarySchema.ts";
import {EmptyArrayContainer, PageFlexWrapper, PaginationRangeButtons, SROnly} from "@/views/shared/_comp";
import {MovieShowingsPageHeader} from "@/views/admin/movies/_pages/showings-page/elements/header.tsx";
import {MovieShowingSummaryCard} from "@/views/admin/movies/_comp/movie-showing/MovieShowingSummaryCard.tsx";

/** Props for the MovieShowingsPageContent component. */
type ContentProps = {
    movie: MovieSummary;
    showings: MovieShowingSummary[];
    page: number;
    perPage: number;
    setPage: (page: number) => void;
    totalItems: number;
    setTitle: (title: string) => void;
};

/**
 * Renders the movie showings page content including header, showing summary cards grid, and pagination controls.
 */
export function MovieShowingsPageContent(
    {movie, showings, page, perPage, setPage, totalItems, setTitle}: ContentProps
): ReactElement {
    useEffect(() => {
        setTitle(`${movie.title} Showings`);
    }, [movie, setTitle])

    return (
        <PageFlexWrapper>
            <MovieShowingsPageHeader movie={movie}/>

            <section className="flex-1">
                <SROnly text={`Showing For ${movie.title}`} />

                {
                    showings.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {showings.map((showing) => <MovieShowingSummaryCard key={showing._id} showing={showing}/>)}
                        </div>
                    ) : (
                        <EmptyArrayContainer text="No Showings Found" className="h-full" />
                    )
                }
            </section>

            <PaginationRangeButtons
                page={page}
                perPage={perPage}
                totalItems={totalItems}
                setPage={setPage}
            />
        </PageFlexWrapper>
    );
}