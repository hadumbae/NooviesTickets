/**
 * @fileoverview Unified Zod schema for validating comprehensive TheatreSeat query parameters, merging filters and sorts.
 */

import { z } from "zod";
import { TheatreSeatQuerySortsSchema } from "@/domains/theatre-seats/_feat/handle-query-options/TheatreSeatQueryMatchSorts.ts";
import { TheatreSeatQueryFiltersSchema } from "@/domains/theatre-seats/_feat/handle-query-options/TheatreSeatQueryMatchFilters.ts";

/**
 * Combined Zod schema merging match-level filters and sort options for TheatreSeat entities.
 */
export const TheatreSeatQueryOptionsSchema =
    TheatreSeatQueryFiltersSchema.merge(TheatreSeatQuerySortsSchema);

/**
 * TypeScript type inferred from {@link TheatreSeatQueryOptionsSchema}.
 */
export type TheatreSeatQueryOptions = z.infer<typeof TheatreSeatQueryOptionsSchema>;
