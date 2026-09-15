/**
 * @fileoverview Defines the schema for paginated, option-aware movie review route configurations.
 */

import {z} from "zod";
import {IDRouteConfigSchema, RequestQueryParamsSchema, QueryPaginationParamsSchema} from "@/shared/_schema";

/** Zod schema for validating a movie ID combined with pagination and query option parameters. */
export const MovieReviewsPaginatedRouteConfigSchema = IDRouteConfigSchema
    .merge(QueryPaginationParamsSchema)
    .merge(RequestQueryParamsSchema);

/** Type definition for the paginated movie reviews route configuration. */
export type MovieReviewsPaginatedRouteConfig = z.infer<typeof MovieReviewsPaginatedRouteConfigSchema>;
