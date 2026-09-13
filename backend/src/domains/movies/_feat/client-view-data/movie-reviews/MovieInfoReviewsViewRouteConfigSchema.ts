/**
 * @fileoverview Schema for the route configuration of the movie reviews information view.
 */

import {z} from "zod";
import {SlugStringSchema, preprocessToNumber, PositiveIntegerSchema} from "@noovies-tickets/common";

/** Zod schema for validating movie review route parameters. */
export const MovieInfoReviewsViewRouteConfigSchema = z.object({
    slug: SlugStringSchema,
    reviewPage: preprocessToNumber(PositiveIntegerSchema).optional().default(1),
    reviewPerPage: preprocessToNumber(PositiveIntegerSchema).optional().default(10),
});

/** Type definition for the movie review route configuration. */
export type MovieInfoReviewsViewRouteConfig = z.infer<typeof MovieInfoReviewsViewRouteConfigSchema>;