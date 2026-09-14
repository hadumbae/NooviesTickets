/**
 * @fileoverview Defines the schema and type for a movie snapshot.
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "@noovies-tickets/common";
import {URLStringSchema} from "@noovies-tickets/common";
import {ISO3166Alpha2CountryCodeSchema} from "@noovies-tickets/common";
import {generateArraySchema} from "@noovies-tickets/common";
import {ISO8601DateTimeSchema, PositiveNumberSchema} from "@noovies-tickets/common";
import {MovieTaglineSchema, MovieTitleSchema} from "@/domains/movies/_schema/fields";

/** Zod schema for validating movie snapshot data. */
export const MovieSnapshotSchema = z.object({
    title: MovieTitleSchema,
    originalTitle: MovieTitleSchema.optional(),
    tagline: MovieTaglineSchema.optional().nullable(),
    posterURL: URLStringSchema.optional().nullable(),
    releaseDate: ISO8601DateTimeSchema.optional().nullable(),
    genres: generateArraySchema(NonEmptyStringSchema.max(150, "Must be 150 characters or less.")),
    runtime: PositiveNumberSchema.lte(500, "Must be 500 or less."),
    country: ISO3166Alpha2CountryCodeSchema,
});

/** Data structure representing a movie snapshot. */
export type MovieSnapshot = z.infer<typeof MovieSnapshotSchema>;