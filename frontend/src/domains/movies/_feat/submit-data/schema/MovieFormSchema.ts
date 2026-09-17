/**
 * @fileoverview Zod schemas for validating movie form data and inferring form types for the movie submission feature.
 */

import {z} from "zod";
import {
    preprocessEmptyToUndefined,
    preprocessOptionalField,
    preprocessToNumber,
    NonFutureDateStringSchema,
    PositiveNumberSchema,
    IDStringSchema,
    ISO3166Alpha2CountryCodeSchema,
    ISO6391LanguageCodeSchema,
    CloudinaryImageSchema,
    MovieGenreIDsSchema,
    MovieSynopsisSchema,
    MovieTaglineSchema,
    MovieTitleSchema,
    MovieTrailerURLSchema,
} from "@noovies-tickets/common";
import {URLParamBooleanSchema} from "@/shared/_schemas/boolean";
import {AnyValues} from "@/shared/_types";

/** Zod schema for validating movie creation and update forms including conditional release date logic. */
export const MovieFormSchema = z.object({
    _id: IDStringSchema.readonly().optional(),

    title: preprocessEmptyToUndefined(MovieTitleSchema),
    originalTitle: preprocessEmptyToUndefined(MovieTitleSchema.optional()).optional(),
    tagline: preprocessOptionalField(MovieTaglineSchema),

    genres: MovieGenreIDsSchema,
    country: preprocessEmptyToUndefined(ISO3166Alpha2CountryCodeSchema),
    synopsis: preprocessEmptyToUndefined(MovieSynopsisSchema),
    runtime: preprocessToNumber(PositiveNumberSchema),
    posterImage: preprocessOptionalField(CloudinaryImageSchema).nullable(),
    trailerURL: preprocessEmptyToUndefined(MovieTrailerURLSchema),

    originalLanguage: preprocessEmptyToUndefined(ISO6391LanguageCodeSchema),
    languages: z.array(ISO6391LanguageCodeSchema).optional(),
    subtitles: z.array(ISO6391LanguageCodeSchema).optional(),

    isReleased: preprocessEmptyToUndefined(URLParamBooleanSchema),
    isAvailable: preprocessEmptyToUndefined(URLParamBooleanSchema),
    releaseDate: preprocessEmptyToUndefined(NonFutureDateStringSchema.optional()).optional()
}).superRefine((values, ctx) => {
    const {releaseDate, isReleased} = values;

    if (isReleased && !releaseDate) {
        ctx.addIssue({
            code: "custom",
            path: ["releaseDate"],
            message: "Required if released.",
        });
    }
});

/** Type inferred from the MovieFormSchema. */
export type MovieFormData = z.infer<typeof MovieFormSchema>;

/** Type representing the initial values for the movie form. */
export type MovieFormStarterValues = AnyValues<MovieFormData>;