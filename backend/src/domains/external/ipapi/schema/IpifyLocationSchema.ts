/**
 * @fileoverview Zod schema and inferred type for the `location` object returned by the Ipify API.
 */

import {z} from "zod";
import {ISO3166Alpha2CountryCodeSchema, NonEmptyStringSchema, TimezoneOffsetSchema} from "@noovies-tickets/common";

/**
 * Schema describing the `location` object returned by the Ipify API.
 */
export const IpifyLocationSchema = z.object({
    country: ISO3166Alpha2CountryCodeSchema,
    region: NonEmptyStringSchema,
    timezone: TimezoneOffsetSchema,
});

/**
 * Inferred type for {@link IpifyLocationSchema}.
 */
export type IpifyLocation = z.infer<typeof IpifyLocationSchema>;
