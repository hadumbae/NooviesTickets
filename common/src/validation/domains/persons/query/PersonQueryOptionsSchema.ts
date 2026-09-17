/**
 * @fileoverview Zod schema and type definitions for combined Person query filtering and sorting options.
 */

import {z} from "zod";
import {PersonQueryFilterSchema} from "./PersonQueryFilterSchema";
import {PersonQuerySortSchema} from "./PersonQuerySortSchema";

/** Zod schema merging filter and sort parameters for person queries. */
export const PersonQueryOptionsSchema = PersonQueryFilterSchema.merge(PersonQuerySortSchema);

/** Type for combined person query filter and sort options. */
export type PersonQueryOptions = z.infer<typeof PersonQueryOptionsSchema>;
