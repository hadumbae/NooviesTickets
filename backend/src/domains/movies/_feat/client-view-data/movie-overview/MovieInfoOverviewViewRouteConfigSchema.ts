/**
 * @fileoverview Defines the schema for movie information view route configuration.
 */

import {z} from "zod";
import {SlugStringSchema, preprocessToNumber, PositiveIntegerSchema} from "@noovies-tickets/common";

/** Zod schema for validating movie information route parameters. */
export const MovieInfoOverviewViewRouteConfigSchema = z.object({
    slug: SlugStringSchema,
    reviewPage: preprocessToNumber(PositiveIntegerSchema).optional(),
    reviewPerPage: preprocessToNumber(PositiveIntegerSchema).optional(),
});

/** Configuration object for the movie information view route. */
export type MovieInfoOverviewViewRouteConfig = z.infer<typeof MovieInfoOverviewViewRouteConfigSchema>;