/**
 * @fileoverview Zod schema and type definitions for movie summary projections.
 */

import {z} from "zod";
import {GenreSchema, generateArraySchema, MovieBaseSchema} from "@noovies-tickets/common";

/** Zod schema for validating movie summary attributes. */
export const MovieSummarySchema = MovieBaseSchema.pick({
    _id: true,
    slug: true,
    title: true,
    tagline: true,
    runtime: true,
    posterImage: true,
    bannerImage: true,
    releaseDate: true,
}).extend({
    genres: generateArraySchema(GenreSchema)
});

/** Inferred type for a validated movie summary document. */
export type MovieSummary = z.infer<typeof MovieSummarySchema>;