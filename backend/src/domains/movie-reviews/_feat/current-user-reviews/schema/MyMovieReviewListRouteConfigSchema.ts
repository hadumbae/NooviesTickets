/**
 * @fileoverview Defines the schema for the current user's paginated movie review list route configuration.
 */

import {z} from "zod";
import {RequestQueryParamsSchema, QueryPaginationParamsSchema} from "@/shared/_schema";

/** Zod schema for validating pagination and query option parameters for the current user's review list. */
export const MyMovieReviewListRouteConfigSchema = QueryPaginationParamsSchema.merge(RequestQueryParamsSchema);

/** Type definition for the current user's movie review list route configuration. */
export type MyMovieReviewListRouteConfig = z.infer<typeof MyMovieReviewListRouteConfigSchema>;
