/**
 * @fileoverview Defines the schema for updating a current-user movie review, combining the review ID with query option parameters.
 */

import {z} from "zod";
import {RequestQueryParamsSchema} from "@/shared/_schema";
import {MyReviewIDRouteConfigSchema} from "@/domains/movie-reviews/_feat/current-user-reviews/schema/MyReviewIDRouteConfigSchema";

/** Zod schema for validating a reviewID combined with query option parameters. */
export const MyReviewUpdateRouteConfigSchema = MyReviewIDRouteConfigSchema.merge(RequestQueryParamsSchema);

/** Type definition for the current-user movie review update route configuration. */
export type MyReviewUpdateRouteConfig = z.infer<typeof MyReviewUpdateRouteConfigSchema>;
