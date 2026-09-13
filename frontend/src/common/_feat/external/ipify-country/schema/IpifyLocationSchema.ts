/**
 * @fileoverview Defines the schema and type for location data returned by the Ipify API.
 */

import {z} from "zod";
import {ISO3166Alpha2CountryCodeSchema, NonEmptyStringSchema, TimezoneOffsetSchema} from "@noovies-tickets/common";

/** Zod validation schema for the Ipify location object. */
export const IpifyLocationSchema = z.object({
    country: ISO3166Alpha2CountryCodeSchema,
    region: NonEmptyStringSchema,
    timezone: TimezoneOffsetSchema,
});

/** Type definition for the Ipify location object. */
export type IpifyLocation = z.infer<typeof IpifyLocationSchema>;