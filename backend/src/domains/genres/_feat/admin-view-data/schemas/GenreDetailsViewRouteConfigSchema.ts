/**
 * @fileoverview Zod schema defining the route parameters for the genre details view, extending request pagination options with a slug.
 */

import {z} from "zod";
import {PaginationOptionsSchema, SlugStringSchema} from "@noovies-tickets/common";

/** Zod schema defining the route configuration properties for the genre details view. */
export const GenreDetailsViewRouteConfigSchema = PaginationOptionsSchema.extend({
    slug: SlugStringSchema,
});

/** Inferred type representing the validated route parameters for the genre details view. */
export type GenreDetailsViewRouteConfig = z.infer<typeof GenreDetailsViewRouteConfigSchema>;