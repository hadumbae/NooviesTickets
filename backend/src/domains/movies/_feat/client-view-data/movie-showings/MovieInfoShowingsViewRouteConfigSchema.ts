/**
 * @fileoverview Zod schema for validating route configuration parameters for the movie showings view.
 */

import {StringValueSchema, preprocessToNumber, preprocessOptionalField} from "@noovies-tickets/common";
import {ISO3166Alpha2CountryCodeSchema} from "@/shared/schema/enums/ISO3166Alpha2CountryCodeSchema";
import {z} from "zod";
import {PositiveIntegerSchema} from "@noovies-tickets/common";
import {SlugStringSchema} from "@/shared/schema/strings/SlugStringSchema";

/** Schema for movie showing route parameters including location and pagination. */
export const MovieInfoShowingsViewRouteConfigSchema = z.object({
    slug: SlugStringSchema,
    near: preprocessOptionalField(StringValueSchema.max(250, "Must be 250 characters or less.")),
    country: preprocessOptionalField(ISO3166Alpha2CountryCodeSchema).default("US"),
    page: preprocessToNumber(PositiveIntegerSchema.optional()).optional().default(1),
    perPage: preprocessToNumber(PositiveIntegerSchema.optional()).optional().default(10),
});

/** Type definition for the movie info showings view route configuration. */
export type MovieInfoShowingsViewRouteConfig = z.infer<typeof MovieInfoShowingsViewRouteConfigSchema>;