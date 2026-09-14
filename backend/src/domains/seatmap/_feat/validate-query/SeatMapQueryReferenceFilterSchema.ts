/**
 * @fileoverview Validation schema for reference-based filtering of SeatMap entities.
 * Resolves properties from related entities such as Movie, Showing, and Seat.
 */

import {z} from "zod";
import {ObjectIdSchema} from "@/shared/schema/mongoose/ObjectIdSchema";
import {
    PositiveNumberSchema,
    preprocessOptionalField,
    preprocessToNumber,
    SeatTypeSchema,
    ShowingStatusSchema,
    SlugStringSchema,
    TrimmedStringSchema
} from "@noovies-tickets/common";

/**
 * Zod schema defining reference filters for SeatMap queries.
 */
export const SeatMapQueryReferenceFilterSchema = z.object({
    movie: ObjectIdSchema.optional(),
    showingSlug: SlugStringSchema.optional(),
    showingStatus: ShowingStatusSchema.optional(),
    seatRow: preprocessOptionalField(TrimmedStringSchema),
    seatNumber: preprocessToNumber(PositiveNumberSchema.optional()).optional(),
    seatType: SeatTypeSchema.optional(),
});

/**
 * TypeScript type inferred from SeatMapQueryReferenceFilterSchema.
 */
export type SeatMapQueryReferenceFilters = z.infer<typeof SeatMapQueryReferenceFilterSchema>;
