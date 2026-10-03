/**
 * @file TheatreSeatRequestQuerySchema.ts
 *
 * Unified query option schema for TheatreSeat endpoints.
 *
 * Composes:
 * - Match-level filters (direct TheatreSeat fields)
 * - Match-level sort options
 */

import {z} from "zod";
import {
    TheatreSeatQueryMatchFiltersSchema
} from "./TheatreSeatQueryMatchFilterSchema";
import {TheatreSeatQueryMatchSortsSchema} from "@/domains/theatre-seats/_feat/validate-query/TheatreSeatQueryMatchSortsSchema";

/**
 * Combined query options for TheatreSeat queries.
 */
export const TheatreSeatRequestQuerySchema = TheatreSeatQueryMatchFiltersSchema.merge(TheatreSeatQueryMatchSortsSchema);

/**
 * Inferred type for seat query options.
 */
export type TheatreSeatRequestQuery =
    z.infer<typeof TheatreSeatRequestQuerySchema>;
