/**
 * @fileoverview Discriminated union schema for reservation variants.
 */

import {z} from "zod";
import {IDStringSchema, ReservationTypeConstant} from "@noovies-tickets/common";
import {generateArraySchema} from "@noovies-tickets/common";
import {superRefineReservation} from "@/domains/reservations/_schema/model/reservations/ReservationSchemaUtilities.ts";
import {ReservationBaseSchema} from "@/domains/reservations/_schema/model/reservations/ReservationBaseSchema.ts";

const GeneralSchemaOption = ReservationBaseSchema.extend({
    reservationType: z.literal(ReservationTypeConstant[0]),
    selectedSeating: z.union([z.null(), z.undefined()]),
});

const SeatingSchemaOption = ReservationBaseSchema.extend({
    reservationType: z.literal(ReservationTypeConstant[1]),
    selectedSeating: generateArraySchema(IDStringSchema),
});

/**
 * Validated reservation schema that discriminates between general admission and reserved seating.
 */
export const ReservationSchema = z
    .discriminatedUnion("reservationType", [GeneralSchemaOption, SeatingSchemaOption])
    .superRefine(superRefineReservation);

/** Inferred type representing a valid Reservation document. */
export type Reservation = z.infer<typeof ReservationSchema>;