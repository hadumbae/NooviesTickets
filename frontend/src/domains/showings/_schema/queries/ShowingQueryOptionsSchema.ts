/**
 * @fileoverview Defines the unified schema and type for Showing query parameters.
 */

import {z} from "zod";
import {ShowingQueryMatchFilterSchema} from "@/domains/showings/_schema/queries/ShowingQueryMatchFilterSchema";
import {ShowingQueryMatchSortSchema} from "@/domains/showings/_schema/queries/ShowingQueryMatchSortSchema";

/** Unified Zod schema combining match filters, sort options, and reference filters for Showings. */
export const ShowingQueryOptionsSchema = ShowingQueryMatchFilterSchema.merge(ShowingQueryMatchSortSchema);

/** Combined query options for fetching Showings inferred from the schema. */
export type ShowingQueryOptions = z.infer<typeof ShowingQueryOptionsSchema>;