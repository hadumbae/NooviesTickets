/**
 * @file Zod schemas for validating Ipify geolocation responses.
 * @filename IpifyCountryData.schema.ts
 */

import {z} from "zod";
import {ISO3166Alpha2CountryCodeSchema, NonEmptyStringSchema, TimezoneOffsetSchema, IpSchema} from "@noovies-tickets/common";

/**
 * Schema describing the `location` object returned by the Ipify API.
 */
export const IpifyLocationSchema = z.object({
    country: ISO3166Alpha2CountryCodeSchema,
    region: NonEmptyStringSchema,
    timezone: TimezoneOffsetSchema,
});

/**
 * Schema describing the Ipify geolocation payload.
 */
export const IpifyCountryDataSchema = z.object({
    ip: IpSchema,
    location: IpifyLocationSchema,
    isp: NonEmptyStringSchema,
});