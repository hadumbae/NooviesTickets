/**
 * @fileoverview Validation schema for reference-based filtering of SeatMap entities.
 * Resolves properties from related entities such as Movie, Showing, and Seat.
 */

import {z} from "zod";
import {URLParamObjectIDSchema} from "@/shared/schema/url/URLParamObjectIDSchema";
import {ShowingStatusSchema, SeatTypeSchema, SlugStringSchema} from "@noovies-tickets/common";
import {URLParamStringSchema} from "@/shared/schema/url/URLParamStringSchema";
import {URLParamPositiveNumberSchema} from "@/shared/schema/url/URLParamPositiveNumberSchema";

/**
 * Zod schema defining reference filters for SeatMap queries.
 */
export const SeatMapQueryReferenceFilterSchema = z.object({
    movie: URLParamObjectIDSchema,
    showingSlug: SlugStringSchema.optional(),
    showingStatus: ShowingStatusSchema.optional(),
    seatRow: URLParamStringSchema,
    seatNumber: URLParamPositiveNumberSchema,
    seatType: SeatTypeSchema.optional(),
});

/**
 * TypeScript type inferred from SeatMapQueryReferenceFilterSchema.
 */
export type SeatMapQueryReferenceFilters = z.infer<typeof SeatMapQueryReferenceFilterSchema>;