/**
 * @fileoverview Immutable snapshot field definitions for a reserved showing.
 */

import type {ReservationType} from "@noovies-tickets/common";
import type {ISO6391LanguageCode} from "@noovies-tickets/common";
import type {ReservedSeatSnapshotSchemaFields} from "@/domains/seatmaps/_models/seat-map-snapshot/ReservedSeatSnapshot.types";
import type {MovieSnapshotSchemaFields} from "@/domains/movies/_models/movie-snapshot/MovieSnapshot.types";
import type {TheatreScreenSnapshotSchemaFields} from "@/domains/theatre-screens/_models/theatre-screen-snapshot";
import type {TheatreSnapshotSchemaFields} from "@/domains/theatres/_models/theatre-snapshot";

/** Represents the fully resolved state of a showing at the moment a reservation is created. */
export type ReservedShowingSnapshotSchemaFields = {
    theatre: TheatreSnapshotSchemaFields;
    screen: TheatreScreenSnapshotSchemaFields;
    movie: MovieSnapshotSchemaFields;
    ticketCount: number;
    selectedSeats?: ReservedSeatSnapshotSchemaFields[] | null;
    startTime: Date;
    endTime?: Date | null;
    language: ISO6391LanguageCode;
    subtitleLanguages: ISO6391LanguageCode[];
    isSpecialEvent?: boolean;
    pricePaid: number;
    reservationType: ReservationType;
}
