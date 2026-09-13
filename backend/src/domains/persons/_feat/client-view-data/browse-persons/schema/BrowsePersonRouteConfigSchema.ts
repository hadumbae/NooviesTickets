/**
 * @fileoverview Defines the schema for person browsing route configuration.
 */

import {z} from "zod";
import {preprocessToNumber} from "@noovies-tickets/common";
import {PositiveIntegerSchema} from "@noovies-tickets/common";

/** Zod schema for validating person browsing pagination parameters. */
export const BrowsePersonRouteConfigSchema = z.object({
    page: preprocessToNumber(PositiveIntegerSchema.optional()).optional(),
    perPage: preprocessToNumber(PositiveIntegerSchema.optional()).optional(),
});

/** Configuration object for person browsing pagination. */
export type BrowsePersonRouteConfig = z.infer<typeof BrowsePersonRouteConfigSchema>;