/** @fileoverview Zod schema and type definitions for physical locations and geospatial data. */

import {z} from "zod";
import {ISO3166Alpha2CountryCodeSchema} from "../enums";
import {IANATimezoneSchema} from "../date-time";
import {CoordinateSchema} from "./CoordinateSchema";
import {StreetStringSchema} from "./StreetStringSchema";
import {CityStringSchema} from "./CityStringSchema";
import {StateStringSchema} from "./StateStringSchema";
import {PostalCodeSchema} from "./PostalCodeSchema";

/** Zod schema for validating physical location data including address and coordinates. */
export const LocationSchema = z.object({
    street: StreetStringSchema.optional(),
    city: CityStringSchema,
    state: StateStringSchema.optional(),
    country: ISO3166Alpha2CountryCodeSchema,
    postalCode: PostalCodeSchema.optional(),
    timezone: IANATimezoneSchema,
    coordinates: CoordinateSchema.optional(),
});

/** Physical location data inferred from the location schema. */
export type Location = z.infer<typeof LocationSchema>;
