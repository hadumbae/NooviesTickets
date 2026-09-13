/**
 * @fileoverview Zod schema and TypeScript type for Showing match filters.
 */

import {z} from "zod";
import {IDStringSchema, DateOnlyStringSchema, PositiveNumberSchema, ShowingStatusSchema} from "@noovies-tickets/common";
import {URLParamBooleanSchema} from "@/common/_schemas/boolean";

/** Zod schema for validating match-based filter criteria for Showings. */
export const ShowingQueryMatchFilterSchema = z.object({
    movie: IDStringSchema.optional(),
    theatre: IDStringSchema.optional(),
    screen: IDStringSchema.optional(),
    startTime: DateOnlyStringSchema.optional(),
    endTime: DateOnlyStringSchema.optional(),
    ticketPrice: PositiveNumberSchema.optional(),
    isSpecialEvent: URLParamBooleanSchema,
    isActive: URLParamBooleanSchema,
    status: ShowingStatusSchema.optional(),
});

/** Match-based filter criteria for querying Showings. */
export type ShowingQueryMatchFilters =
    z.infer<typeof ShowingQueryMatchFilterSchema>;