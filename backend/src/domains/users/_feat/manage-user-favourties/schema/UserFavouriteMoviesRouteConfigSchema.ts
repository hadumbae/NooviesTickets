/**
 * @fileoverview Defines the schema for the current user's paginated favourite movies route configuration.
 */

import {z} from "zod";
import {QueryPaginationParamsSchema} from "@/shared/_schema";

/** Zod schema for validating pagination parameters for the favourite movies list. */
export const UserFavouriteMoviesRouteConfigSchema = QueryPaginationParamsSchema;

/** Type definition for the favourite movies route configuration. */
export type UserFavouriteMoviesRouteConfig = z.infer<typeof UserFavouriteMoviesRouteConfigSchema>;
