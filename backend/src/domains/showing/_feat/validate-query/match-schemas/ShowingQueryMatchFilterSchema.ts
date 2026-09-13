/**
 * @fileoverview Validation schema for direct attribute filtering of Showing entities.
 * Targets specific showtime properties persisted on the Showing document.
 */

import {z} from "zod";
import {URLParamObjectIDSchema} from "@/shared/schema/url/URLParamObjectIDSchema";
import {URLParamPositiveNumberSchema} from "@/shared/schema/url/URLParamPositiveNumberSchema";
import {ShowingStatusSchema} from "@noovies-tickets/common";
import {URLParamBooleanSchema} from "@/shared/schema/url/URLParamBooleanSchema";

/**
 * Zod schema defining match-level filters for Showing queries.
 */
export const ShowingQueryMatchFilterSchema = z.object({
    movie: URLParamObjectIDSchema,
    theatre: URLParamObjectIDSchema,
    screen: URLParamObjectIDSchema,
    ticketPrice: URLParamPositiveNumberSchema,
    isSpecialEvent: URLParamBooleanSchema,
    isActive: URLParamBooleanSchema,
    status: ShowingStatusSchema.optional(),
});

/**
 * TypeScript type inferred from ShowingQueryMatchFilterSchema.
 */
export type ShowingQueryMatchFilters = z.infer<typeof ShowingQueryMatchFilterSchema>;