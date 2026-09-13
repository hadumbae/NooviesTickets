/**
 * @fileoverview Validated movie schema with identifier and relational references for the movie domain.
 *
 */

import {MovieReleaseDateRefinement} from "@/domains/movies/_schema/movie/MovieSchemaUtilities.ts";
import {z} from "zod";
import {IDStringSchema, preprocessEmptyToUndefined, DateTimeInstanceSchema, UTCDayOnlyDateTimeSchema, PositiveNumberSchema, ISO3166Alpha2CountryCodeSchema, ISO6391LanguageCodeSchema} from "@noovies-tickets/common";
import {NonEmptyStringSchema} from "@/common/_schemas";
import {CoercedBooleanValueSchema} from "@/common/_schemas/boolean/CoercedBooleanValueSchema.ts";
import {CloudinaryImageSchema} from "@/common/_schemas/cloudinary-image/CloudinaryImageSchema.ts";

import {
    MovieGenreIDsSchema,
    MovieSynopsisSchema,
    MovieTaglineSchema,
    MovieTitleSchema, MovieTrailerURLSchema
} from "@/domains/movies/_schema/fields";

/** Core Zod schema defining the base structure and constraints of a Movie. */
export const MovieBaseSchema = z.object({
    _id: IDStringSchema.readonly(),
    slug: NonEmptyStringSchema.readonly(),

    title: MovieTitleSchema,
    originalTitle: preprocessEmptyToUndefined(MovieTitleSchema.optional()).optional(),
    tagline: MovieTaglineSchema.optional(),

    genres: MovieGenreIDsSchema,
    country: ISO3166Alpha2CountryCodeSchema,
    synopsis: MovieSynopsisSchema,
    runtime: PositiveNumberSchema,
    posterImage: CloudinaryImageSchema.optional().nullable(),
    bannerImage: CloudinaryImageSchema.optional().nullable(),
    trailerURL: MovieTrailerURLSchema,

    languages: z.array(ISO6391LanguageCodeSchema),
    subtitles: z.array(ISO6391LanguageCodeSchema),
    originalLanguage: ISO6391LanguageCodeSchema,

    releaseDate: z.union([DateTimeInstanceSchema, UTCDayOnlyDateTimeSchema]).optional().nullable(),
    isReleased: CoercedBooleanValueSchema,
    isAvailable: CoercedBooleanValueSchema,
});

/** Final validated Movie schema incorporating release date lifecycle logic. */
export const MovieSchema = MovieBaseSchema.superRefine(MovieReleaseDateRefinement);

/** Represents a validated Movie record with unpopulated genre references. */
export type Movie = z.infer<typeof MovieSchema>;