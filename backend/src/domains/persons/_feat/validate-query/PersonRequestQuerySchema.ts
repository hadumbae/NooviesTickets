/**
 * @fileoverview Combined validation schema and type for Person query options.
 */

import {z} from "zod";
import {PersonQuerySortSchema} from "@noovies-tickets/common";
import {PersonRequestQueryFiltersSchema} from "@/domains/persons/_feat/validate-query/PersonRequestQueryFiltersSchema";

/**
 * Merges filter and sort schemas into a single validated Person query options shape.
 */
export const PersonRequestQuerySchema = PersonQuerySortSchema.merge(PersonRequestQueryFiltersSchema);

/**
 * Type representing the validated query options for Person documents.
 */
export type PersonRequestQuery = z.infer<typeof PersonRequestQuerySchema>;