/**
 * @fileoverview Validated movie schema with identifier and relational references for the movie domain.
 */

import {z} from "zod";
import {MovieReleaseDateRefinement} from "./MovieSchemaUtilities";
import {
    MovieGenreIDsSchema,
    MovieSynopsisSchema,
    MovieTaglineSchema,
    MovieTitleSchema,
    MovieTrailerURLSchema
} from "../fields";
import {BaseModelDTOSchema} from "../../../schema/model/BaseModelDTOSchema";
import {BooleanValueSchema} from "../../../schema/booleans/BooleanValueSchema";
import {CloudinaryImageSchema} from "../../../schema/cloudinary/CloudinaryImageSchema";
import {DateTimeInstanceSchema} from "../../../schema/date-time/DateTimeInstanceSchema";
import {UTCDayOnlyDateTimeSchema} from "../../../schema/date-time/UTCDayOnlyDateTimeSchema";
import {ISO3166Alpha2CountryCodeSchema} from "../../../schema/enums/country/ISO3166Alpha2CountryCodeSchema";
import {ISO6391LanguageCodeSchema} from "../../../schema/enums/languages/ISO6391LanguageCodeSchema";
import {NonEmptyStringSchema} from "../../../schema/strings/NonEmptyStringSchema";
import {PositiveNumberSchema} from "../../../schema/numbers/PositiveNumberSchema";
import {preprocessEmptyToUndefined} from "../../../preprocessors/preprocessEmptyToUndefined";

/** Core Zod schema defining the base structure and constraints of a Movie. */
export const MovieBaseSchema = BaseModelDTOSchema.extend({
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
    isReleased: BooleanValueSchema,
    isAvailable: BooleanValueSchema,
});

/** Final validated Movie schema incorporating release date lifecycle logic. */
export const MovieSchema = MovieBaseSchema.superRefine(MovieReleaseDateRefinement);

/** Represents a validated Movie record with unpopulated genre references. */
export type Movie = z.infer<typeof MovieSchema>;
