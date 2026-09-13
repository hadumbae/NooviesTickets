/**
 * @fileoverview Action trigger components for managing movie image assets within the movie details view.
 */

import {ObjectIdString} from "@noovies-tickets/common";

/** Props for the MovieDetailsPageActions component. */
export type MovieDetailsPageActionsProps = {
    movieID: ObjectIdString;
    className?: string;
};