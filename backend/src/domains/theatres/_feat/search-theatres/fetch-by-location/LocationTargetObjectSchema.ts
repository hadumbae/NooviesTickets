/**
 * @fileoverview Zod schema and inferred type for an object wrapper containing optional location target and country fields.
 */

import {z} from "zod";
import {ISO3166Alpha2CountryCodeSchema} from "@noovies-tickets/common";
import {LocationTargetSchema} from "./LocationTargetSchema.js";

/**
 * Schema for an object wrapper containing optional location target and country fields.
 */
export const LocationTargetObjectSchema = z.object({
    target: LocationTargetSchema.optional(),
    country: ISO3166Alpha2CountryCodeSchema.optional(),
});

/**
 * Inferred type for {@link LocationTargetObjectSchema}.
 */
export type LocationTargetObject = z.infer<typeof LocationTargetObjectSchema>;
