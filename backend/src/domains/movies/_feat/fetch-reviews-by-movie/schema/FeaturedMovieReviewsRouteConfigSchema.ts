/**
 * @fileoverview Defines the schema for featured movie review route configurations.
 */

import {z} from "zod";
import {IDRouteConfigSchema, QueryOptionParamsSchema} from "@/shared/_schema";

/** Zod schema for validating a movie ID combined with query option parameters. */
export const FeaturedMovieReviewsRouteConfigSchema = IDRouteConfigSchema.merge(QueryOptionParamsSchema);

/** Type definition for the featured movie reviews route configuration. */
export type FeaturedMovieReviewsRouteConfig = z.infer<typeof FeaturedMovieReviewsRouteConfigSchema>;
