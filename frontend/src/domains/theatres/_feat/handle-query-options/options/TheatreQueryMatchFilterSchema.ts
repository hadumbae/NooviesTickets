/**
 * @fileoverview Defines the Zod schema and types for filtering theatre query results.
 */

import {z} from "zod";
import {
    CityStringSchema,
    IDStringSchema,
    NumberValueSchema,
    IANATimezoneSchema,
    PostalCodeSchema,
    preprocessOptionalField,
    preprocessToNumber,
    ISO3166Alpha2CountryCodeSchema,
    StateStringSchema,
    StreetStringSchema,
    TheatreNameSchema,
} from "@noovies-tickets/common";

/** Zod schema defining filter parameters for querying theatre data. */
export const TheatreQueryMatchFilterSchema = z.object({
    _id: preprocessOptionalField(IDStringSchema),
    name: preprocessOptionalField(TheatreNameSchema),
    seatCapacity: preprocessToNumber(NumberValueSchema.optional()).optional(),
    street: preprocessOptionalField(StreetStringSchema),
    city: preprocessOptionalField(CityStringSchema),
    state: preprocessOptionalField(StateStringSchema),
    country: preprocessOptionalField(ISO3166Alpha2CountryCodeSchema),
    postalCode: preprocessOptionalField(PostalCodeSchema),
    timezone: preprocessOptionalField(IANATimezoneSchema),
});

/** Inferred type for validated theatre match filters. */
export type TheatreQueryMatchFilters = z.infer<typeof TheatreQueryMatchFilterSchema>;