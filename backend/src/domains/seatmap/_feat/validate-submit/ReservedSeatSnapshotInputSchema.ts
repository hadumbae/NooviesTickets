/**
 * @fileoverview Defines the validation schema for input data when creating a reserved seat snapshot.
 */

import {z} from "zod";
import {SeatTypeSchema} from "@noovies-tickets/common";
import {NonEmptyStringSchema, PositiveNumberSchema} from "@noovies-tickets/common";
import {ObjectIdSchema} from "@/shared/schema/mongoose/ObjectIdSchema";

/** Zod schema for validating reserved seat snapshot input data. */
export const ReservedSeatSnapshotInputSchema = z.object({
    seatMap: ObjectIdSchema,
    seatIdentifier: NonEmptyStringSchema.max(20, "Must be 20 characters or less."),
    seatType: SeatTypeSchema,
    pricePaid: PositiveNumberSchema,
    seatLabel: NonEmptyStringSchema.max(50, "Must be 50 characters or less.").optional(),
});

/** Type definition inferred from the ReservedSeatSnapshotInputSchema. */
export type ReservedSeatSnapshotInputData = z.infer<typeof ReservedSeatSnapshotInputSchema>;
