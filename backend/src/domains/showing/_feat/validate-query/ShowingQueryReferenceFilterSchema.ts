/**
 * @fileoverview Validation schema for reference-based filtering of Showing entities.
 * Resolves relationships through joined entities like Movie, Theatre, and Screen.
 */

import {z} from "zod";
import {ISO3166Alpha2CountryCodeSchema, preprocessOptionalField, TrimmedStringSchema} from "@noovies-tickets/common";

/**
 * Zod schema defining reference filters for Showing queries.
 */
export const ShowingQueryReferenceFilterSchema = z.object({
    movieSlug: preprocessOptionalField(TrimmedStringSchema),
    theatreSlug: preprocessOptionalField(TrimmedStringSchema),
    screenSlug: preprocessOptionalField(TrimmedStringSchema),
    theatreState: preprocessOptionalField(TrimmedStringSchema),
    theatreCity: preprocessOptionalField(TrimmedStringSchema),
    theatreCountry: ISO3166Alpha2CountryCodeSchema.optional(),
});

/**
 * TypeScript type inferred from ShowingQueryReferenceFilterSchema.
 */
export type ShowingQueryReferenceFilters = z.infer<typeof ShowingQueryReferenceFilterSchema>;
