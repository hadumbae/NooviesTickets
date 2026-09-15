/**
 * @fileoverview Defines the validation schema for creating snapshots of movie showings during the reservation process.
 */

import {z} from "zod";
import {generateArraySchema} from "@noovies-tickets/common";
import {BooleanValueSchema, ValidDateInstanceSchema, PositiveNumberSchema, ISO6391LanguageCodeSchema} from "@noovies-tickets/common";
import {ReservationTypeSchema} from "@noovies-tickets/common";
import {ReservedSeatSnapshotInputSchema} from "@/domains/seatmaps/_feat/validate-submit/ReservedSeatSnapshotInputSchema";
import {TheatreScreenSnapshotInputSchema} from "@/domains/theatre-screens/_feat/validate-submit";
import {TheatreSnapshotInputSchema} from "@/domains/theatres/_validation";
import {MovieSnapshotInputSchema} from "@/domains/movies/_feat/validate-submit";

/** Zod validation schema for reserved showing snapshot input data. */
export const ReservedShowingSnapshotInputSchema = z.object({
    movie: MovieSnapshotInputSchema,
    theatre: TheatreSnapshotInputSchema,
    screen: TheatreScreenSnapshotInputSchema,
    selectedSeats: generateArraySchema(ReservedSeatSnapshotInputSchema).nullable().optional(),
    startTime: ValidDateInstanceSchema,
    endTime: ValidDateInstanceSchema.nullable().optional(),
    language: ISO6391LanguageCodeSchema,
    subtitleLanguages: z.array(ISO6391LanguageCodeSchema).nonempty({message: "Must not be empty."}),
    isSpecialEvent: BooleanValueSchema.optional(),
    pricePaid: PositiveNumberSchema,
    ticketCount: PositiveNumberSchema,
    reservationType: ReservationTypeSchema,
});

/** Type representing the validated input for a reserved showing snapshot. */
export type ReservedShowingSnapshotInputData =
    z.infer<typeof ReservedShowingSnapshotInputSchema>;
