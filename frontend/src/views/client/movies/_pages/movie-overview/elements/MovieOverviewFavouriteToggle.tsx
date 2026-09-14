/**
 * @fileoverview Component for toggling a movie's favorite status within the movie overview page.
 */

import {ReactElement} from "react";
import {AnimatedLoader} from "@/views/shared/_comp/loaders/AnimatedLoader.tsx";
import {Card, CardContent} from "@/views/shared/_comp/ui";
import {QueryDataLoader} from "@/views/shared/_feat";
import {FavouriteMovieHeartButton} from "@/views/client/movies/_comp";

import {ObjectIdString} from "@noovies-tickets/common";
import {
    IsFavouriteMovieMetadata,
    useCheckIsFavouriteMovie,
    useToggleUserFavouriteMovie
} from "@/domains/users/_feat/manage-user-favourites";
import {cn} from "@/shared/_feat";

/** Props for the MovieOverviewFavouriteToggle component. */
type SelectorProps = {
    movieID: ObjectIdString;
}

/** Displays a card allowing the user to view and toggle the favorite status of a specific movie. */
export function MovieOverviewFavouriteToggle(
    {movieID}: SelectorProps
): ReactElement {
    const query = useCheckIsFavouriteMovie({_id: movieID});
    const {mutateAsync, isPending} = useToggleUserFavouriteMovie();

    return (
        <QueryDataLoader query={query} loaderComponent={AnimatedLoader}>
            {({isFavourite}: IsFavouriteMovieMetadata) => {
                return (
                    <Card className={isFavourite ? "border-pink-500" : ""}>
                        <CardContent className="p-4 flex justify-between items-center">
                            <h2 className={cn("subsection-title", isFavourite ? "text-pink-500" : "")}>
                                {isFavourite ? "In Favourites" : "Add To Your Favourites"}
                            </h2>

                            <FavouriteMovieHeartButton
                                className={isFavourite ? "border-pink-500" : ""}
                                isFavourite={isFavourite}
                                isPending={isPending}
                                disabled={isPending}
                                onClick={() => mutateAsync(movieID)}
                            />
                        </CardContent>
                    </Card>
                );
            }}
        </QueryDataLoader>
    );
}