/**
 * @fileoverview Zod schema and type definitions for movie showings view route configuration parameters.
 */

import {z} from "zod";
import {getEnvVariables} from "@/shared/_feat/env/getEnvVariables";
import {PositiveIntegerSchema, preprocessToNumber, SlugStringSchema} from "@noovies-tickets/common";

const {PAGINATION_PAGE_DEFAULT, PAGINATION_PER_PAGE_DEFAULT} = getEnvVariables();

/** Zod schema for validating movie showings view route parameters with environment defaults. */
export const MovieShowingsViewRouteConfigSchema = z.object({
    slug: SlugStringSchema,
    page: preprocessToNumber(PositiveIntegerSchema).catch(PAGINATION_PAGE_DEFAULT),
    perPage: preprocessToNumber(PositiveIntegerSchema).catch(PAGINATION_PER_PAGE_DEFAULT),
});

/** Inferred type for movie showings view route configuration parameters. */
export type MovieShowingsViewRouteConfig = z.infer<typeof MovieShowingsViewRouteConfigSchema>;