/**
 * @fileoverview Validation schema and type definitions for the Theatre Details view routing configuration.
 */

import {z} from "zod";
import {SlugStringSchema} from "@/shared/schema/strings/SlugStringSchema";
import {NonNegativeNumberSchema} from "@noovies-tickets/common";
import {preprocessToNumber} from "@noovies-tickets/common";

/**
 * Zod schema for validating the route and search parameters of the Theatre Details page.
 */
export const TheatreDetailsViewRouteConfigSchema = z.object({
    slug: SlugStringSchema,
    screenPage: preprocessToNumber(NonNegativeNumberSchema.optional()).optional(),
    screenPerPage: preprocessToNumber(NonNegativeNumberSchema.optional()).optional(),
    showingLimit: preprocessToNumber(NonNegativeNumberSchema.optional()).optional(),
});

/**
 * Type definition for the Theatre Details route configuration, inferred from the schema.
 */
export type TheatreDetailsViewRouteConfig = z.infer<typeof TheatreDetailsViewRouteConfigSchema>;