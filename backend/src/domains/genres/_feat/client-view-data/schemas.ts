/**
 * @fileoverview Zod validation schema for the Genre Details public view request.
 * Combines route parameter requirements with standard pagination query options.
 */

import {z} from "zod";
import {PaginationOptionsSchema, SlugStringSchema} from "@noovies-tickets/common";

/**
 * Validation schema for the Genre-specific browsing endpoint.
 */
export const BrowseGenreWithMoviesRouteParamSchema = PaginationOptionsSchema.extend({
    slug: SlugStringSchema,
});

/**
 * TypeScript type inferred from {@link BrowseGenreWithMoviesRouteParamSchema}.
 */
export type BrowseGenreWithMoviesRouteParams = z.infer<typeof BrowseGenreWithMoviesRouteParamSchema>;