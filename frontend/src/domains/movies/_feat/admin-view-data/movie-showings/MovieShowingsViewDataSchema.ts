/**
 * @fileoverview Zod schema and type definitions for validated movie showings view data.
 */

import {z} from "zod";
import {MovieSummarySchema} from "@/domains/movies";
import {generatePaginationSchema} from "@noovies-tickets/common";
import {MovieShowingSummarySchema} from "@/domains/showings/_schema/showing/MovieShowingSummarySchema.ts";

/** Schema for validating movie showings view data including movie details and paginated showings. */
export const MovieShowingsViewDataSchema = z.object({
    movie: MovieSummarySchema,
    showings: generatePaginationSchema(MovieShowingSummarySchema),
});

/** Inferred TypeScript type representing movie showings view data. */
export type MovieShowingsViewData = z.infer<typeof MovieShowingsViewDataSchema>;