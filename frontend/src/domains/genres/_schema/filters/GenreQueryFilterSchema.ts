/**
 * @fileoverview Zod schema and type definitions for genre filtering options.
 */

import {z} from "zod";
import {preprocessEmptyToUndefined, GenreNameSchema} from "@noovies-tickets/common";

/** Zod schema for validating genre query filter parameters. */
export const GenreQueryFilterSchema = z.object({
    name: preprocessEmptyToUndefined(GenreNameSchema.optional()).optional(),
});

/** Type representing valid filter parameters for genre queries. */
export type GenreQueryFilters = z.infer<typeof GenreQueryFilterSchema>;