/**
 * @fileoverview Defines the Zod schema and type for slug-based route configurations.
 */

import {z} from "zod";
import {SlugStringSchema} from "@noovies-tickets/common";

/** Zod schema for validating slug route configuration objects. */
export const SlugRouteConfigSchema = z.object({
    slug: SlugStringSchema,
});

/** Type definition for a slug route configuration. */
export type SlugRouteConfig = z.infer<typeof SlugRouteConfigSchema>;