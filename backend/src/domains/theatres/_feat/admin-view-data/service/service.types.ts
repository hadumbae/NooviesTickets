/**
 * @fileoverview Type definitions for theatre and screen data aggregation services.
 */

import type {SlugString} from "@noovies-tickets/common";
import type {TheatreSchemaFields} from "@/domains/theatres/_models/theatre/Theatre.types";
import type {TheatreScreenSchemaFields} from "@/domains/theatre-screens/_models/theatre-screen";
import type {PaginationReturns} from "@/shared/_types/pagination/PaginationReturns";
import type {ShowingSchemaFields} from "@/domains/showings/_models/showing/Showing.types";

/** Configuration for fetching data for the Theatre Details administrative view. */
export type FetchTheatreDetailsViewDataConfig = {
    slug: SlugString;
    screenPage?: number;
    screenPerPage?: number;
    showingLimit?: number;
};

/**
 * Data payload for the Theatre Details view containing theatre, showings, and paginated screens.
 */
export type TheatreDetailsViewData = {
    theatre: TheatreSchemaFields;
    showings: ShowingSchemaFields[];
    screens: PaginationReturns<TheatreScreenSchemaFields>;
};

/** Configuration for fetching paginated showings for a specific theatre. */
export type FetchTheatreShowingListViewDataConfig = {
    slug: SlugString;
    page?: number;
    perPage?: number;
};

/** Paginated showing data and theatre context for the showing list view. */
export type TheatreShowingListViewData = {
    theatre: TheatreSchemaFields;
    showings: PaginationReturns<ShowingSchemaFields>;
};