/**
 * @fileoverview Defines the Zod schema and types for filtering theatre query results.
 */

import {z} from "zod";
import {IDStringSchema, NumberValueSchema, IANATimezoneSchema, preprocessOptionalField, preprocessToNumber, ISO3166Alpha2CountryCodeSchema} from "@noovies-tickets/common";
import {TheatreNameSchema} from "@/domains/theatres/_schema/fields/TheatreNameSchema.ts";
import {CityStringSchema, PostalCodeSchema, StateStringSchema, StreetStringSchema} from "@/common/_models/location";

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