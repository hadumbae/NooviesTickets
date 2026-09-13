/**
 * @fileoverview Zod schema and type definition for standard pagination parameters.
 */

import {z} from "zod";
import {PositiveNumberSchema} from "../numbers";
import {preprocessToNumber} from "../../preprocessors";

/** Validates and transforms incoming pagination parameters. */
export const PaginationOptionsSchema = z.object({
    /** The current page index (1-based). */
    page: preprocessToNumber(PositiveNumberSchema),

    /** The number of records to retrieve per result set. */
    perPage: preprocessToNumber(PositiveNumberSchema),
});

/** TypeScript type inferred from the PaginationOptionsSchema. */
export type PaginationOptions = z.infer<typeof PaginationOptionsSchema>;
