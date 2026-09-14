/**
 * @fileoverview Zod schema and inferred type for the Ipify geolocation payload.
 */

import {z} from "zod";
import {NonEmptyStringSchema, IpSchema} from "@noovies-tickets/common";
import {IpifyLocationSchema} from "./IpifyLocationSchema.js";

/**
 * Schema describing the Ipify geolocation payload.
 */
export const IpifyCountryDataSchema = z.object({
    ip: IpSchema,
    location: IpifyLocationSchema,
    isp: NonEmptyStringSchema,
});

/**
 * Inferred type for {@link IpifyCountryDataSchema}.
 */
export type IpifyCountryData = z.infer<typeof IpifyCountryDataSchema>;
