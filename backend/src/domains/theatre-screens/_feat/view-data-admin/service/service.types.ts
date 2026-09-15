/**
 * @fileoverview Data structure definitions for the Theatre TheatreScreen Details view.
 * Represents the aggregated state required to render a screen's layout and its parent context.
 */

import type {SlugString} from "@noovies-tickets/common";
import type {TheatreWithVirtuals} from "@/domains/theatres/_models/theatre";
import type {TheatreScreenSchemaFields} from "@/domains/theatre-screens/_models/theatre-screen";
import type {SeatSchemaFields} from "@/domains/seats/_models";
import type {ShowingSchemaFields} from "@/domains/showings";

/**
 * Configuration for identifying specific screen data within the theatre hierarchy.
 */
export type FetchTheatreScreenDetailsViewDataConfig = {
    theatreSlug: SlugString;
    screenSlug: SlugString;
    recentShowingsCount?: number;
};

/**
 * Aggregated data structure for the TheatreScreen View.
 */
export type TheatreScreenDetailsViewData = {
    theatre: TheatreWithVirtuals;
    screen: TheatreScreenSchemaFields;
    seats: SeatSchemaFields[];
    recentShowings: ShowingSchemaFields[]
};