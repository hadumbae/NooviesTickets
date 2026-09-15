/**
 * @fileoverview Defines types for fetching and representing showing details in the admin view.
 */

import type {ShowingSchemaFields} from "@/domains/showings/_models/showing/Showing.types";
import type {MovieSchemaFields} from "@/domains/movies/_models/movie";
import type {SeatMapSchemaFields} from "@/domains/seatmaps/_models/seat-map/SeatMap.types";
import type {TheatreSchemaFields} from "@/domains/theatres/_models/theatre";
import type {TheatreScreenSchemaFields} from "@/domains/theatre-screens/_models/theatre-screen";

/** Configuration for fetching showing details view data. */
export type FetchShowingDetailsViewDataConfig = {
    slug: string;
}

/** Composite data structure for the showing details admin view. */
export type ShowingDetailsViewData = {
    showing: ShowingSchemaFields;
    movie: MovieSchemaFields;
    seating: SeatMapSchemaFields[];
    theatre: TheatreSchemaFields;
    screen: TheatreScreenSchemaFields;
}