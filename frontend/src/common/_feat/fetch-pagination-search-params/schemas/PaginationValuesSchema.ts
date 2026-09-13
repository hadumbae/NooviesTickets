/**
 * @fileoverview Zod schema for validating pagination search parameters.
 */

import {z} from "zod";
import {preprocessToNumber, PositiveNumberSchema} from "@noovies-tickets/common";


/** Zod schema for validating page and per-page values. */
export const PaginationValuesSchema = z.object({
    page: preprocessToNumber(PositiveNumberSchema),
    perPage: preprocessToNumber(PositiveNumberSchema),
});

/** Type definition for pagination values inferred from the schema. */
export type PaginationValues = z.infer<typeof PaginationValuesSchema>;