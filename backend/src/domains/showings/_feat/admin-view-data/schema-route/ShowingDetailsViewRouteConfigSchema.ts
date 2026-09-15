/**
 * @fileoverview Defines the route configuration schema for the showing details admin view.
 */

import {z} from "zod";
import {SlugStringSchema} from "@noovies-tickets/common";

/** Zod schema for validating showing details route parameters. */
export const ShowingDetailsViewRouteConfigSchema = z.object({
    slug: SlugStringSchema,
});

/** Type definition for the showing details route configuration. */
export type ShowingDetailsViewRouteConfig = z.infer<typeof ShowingDetailsViewRouteConfigSchema>;