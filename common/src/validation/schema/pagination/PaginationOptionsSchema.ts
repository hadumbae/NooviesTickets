/**
 * @fileoverview Zod schema and type definition for standard pagination parameters.
 */

import {z} from "zod";
import {PositiveIntegerSchema} from "../numbers";
import {preprocessToNumber} from "../../preprocessors";

/** Validates and transforms incoming pagination parameters. */
export const PaginationOptionsSchema = z.object({
    page: preprocessToNumber(PositiveIntegerSchema).catch(1),
    perPage: preprocessToNumber(PositiveIntegerSchema).catch(10),
});

/** TypeScript type inferred from the PaginationOptionsSchema. */
export type PaginationOptions = z.infer<typeof PaginationOptionsSchema>;
