/**
 * @fileoverview Zod schema and inferred type for an object wrapper containing optional location target and country fields.
 */

import {z} from "zod";
import {ISO3166Alpha2CountryCodeSchema, preprocessOptionalField} from "@noovies-tickets/common";
import {LocationTargetSchema} from "./LocationTargetSchema.js";

/**
 * Schema for an object wrapper containing optional location target and country fields.
 */
export const LocationTargetObjectSchema = z.object({
    target: preprocessOptionalField(LocationTargetSchema),
    country: preprocessOptionalField(ISO3166Alpha2CountryCodeSchema),
});

/**
 * Inferred type for {@link LocationTargetObjectSchema}.
 */
export type LocationTargetObject = z.infer<typeof LocationTargetObjectSchema>;
