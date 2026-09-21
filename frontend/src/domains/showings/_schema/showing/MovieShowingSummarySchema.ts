/**
 * @fileoverview Zod schema and type definitions for movie showing summary projections.
 */

import {z} from "zod";
import {ShowingSchema} from "@/domains/showings/_schema/showing/ShowingSchema.ts";

/** Zod schema for validating movie showing summary attributes. */
export const MovieShowingSummarySchema = ShowingSchema.pick({
    _id: true,
    startTime: true,
    endTime: true,
    ticketPrice: true,
    status: true,
    theatreSnapshot: true,
    config: true,
    slug: true,
});

/** Inferred type for a validated movie showing summary document. */
export type MovieShowingSummary = z.infer<typeof MovieShowingSummarySchema>;