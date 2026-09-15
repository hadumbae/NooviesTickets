/**
 * @fileoverview Defines the schema for query option parameters on current-user movie review routes.
 */

import {z} from "zod";
import {RequestQueryParamsSchema} from "@/shared/_schema";

/** Zod schema for validating query option parameters on current-user movie review routes. */
export const MyMovieReviewOptionsRouteConfigSchema = RequestQueryParamsSchema;

/** Type definition for the current-user movie review options route configuration. */
export type MyMovieReviewOptionsRouteConfig = z.infer<typeof MyMovieReviewOptionsRouteConfigSchema>;
