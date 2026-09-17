/**
 * @fileoverview Validated movie schema for data sets including populated genre objects.
 */

import { z } from "zod";

import {GenreSchema, generateArraySchema, MovieBaseSchema, MovieReleaseDateRefinement} from "@noovies-tickets/common";

/** Extended movie schema where the genres field is expected as full objects. */
export const ExtendedMovieWithGenresSchema = MovieBaseSchema.extend({
  genres: generateArraySchema(GenreSchema),
});

/** Validated Movie schema with populated genres and lifecycle refinements. */
export const MovieWithGenresSchema = ExtendedMovieWithGenresSchema.superRefine(MovieReleaseDateRefinement);

/** Represents a movie object containing full genre metadata. */
export type MovieWithGenres = z.infer<typeof MovieWithGenresSchema>;