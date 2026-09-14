/**
 * @fileoverview Zod schema defining an immutable snapshot of a reserved showing.
 */

import {z} from "zod";
import {MovieSnapshotSchema} from "@/domains/movies/_schema";
import {TheatreSnapshotSchema} from "@/domains/theatres/_schema";
import {TheatreScreenSnapshotSchema} from "@/domains/theatre-screens/_schema";
import {generateArraySchema} from "@noovies-tickets/common";
import {BooleanValueSchema, ISO8601DateTimeSchema, PositiveNumberSchema} from "@noovies-tickets/common";
import {NonEmptyStringSchema} from "@noovies-tickets/common";
import {ReservedSeatSnapshotSchema} from "@/domains/reservations/_schema/snapshot/ReservedSeatSnapshotSchema.ts";


/** Zod schema for capturing the complete state of a showing at the moment a reservation is finalized. */
export const ReservedShowingSnapshotSchema = z.object({
    movie: MovieSnapshotSchema,
    theatre: TheatreSnapshotSchema,
    screen: TheatreScreenSnapshotSchema,
    selectedSeats: generateArraySchema(ReservedSeatSnapshotSchema).nullable(),
    startTime: ISO8601DateTimeSchema,
    endTime: ISO8601DateTimeSchema.nullable().optional(),
    language: NonEmptyStringSchema,
    subtitleLanguages: z.array(NonEmptyStringSchema).nonempty({message: "Must not be empty."}),
    isSpecialEvent: BooleanValueSchema.optional(),
    pricePaid: PositiveNumberSchema,
});

/** TypeScript type inferred from ReservedShowingSnapshotSchema. */
export type ReservedShowingSnapshot = z.infer<typeof ReservedShowingSnapshotSchema>;