/**
 * @file Zod schema and type definition for standard request-based pagination parameters.
 * @filename RequestPaginationOptionsSchema.ts
 */

import {z} from "zod";
import {PositiveNumberSchema, preprocessToNumber} from "@noovies-tickets/common";

/**
 * Validates and transforms incoming pagination parameters.
 * ---
 */
export const RequestPaginationOptionsSchema = z.object({
    /** The current page index (1-based). */
    page: preprocessToNumber(PositiveNumberSchema),

    /** The number of records to retrieve per result set. */
    perPage: preprocessToNumber(PositiveNumberSchema),
});

/**
 * TypeScript type inferred from the RequestPaginationOptionsSchema.
 */
export type RequestPaginationOptions = z.infer<typeof RequestPaginationOptionsSchema>;