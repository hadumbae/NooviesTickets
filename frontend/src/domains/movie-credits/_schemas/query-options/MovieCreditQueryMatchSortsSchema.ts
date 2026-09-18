/**
 * @fileoverview Sort options for MovieCredit queries.
 * Defines the schema and types for ordering movie credit results based on
 * specific document fields.
 */

import {z} from "zod";
import {MongooseNumericSortOrderSchema, preprocessOptionalField} from "@noovies-tickets/common";

/**
 * Sort options for MovieCredit queries.
 */
export const MovieCreditQueryMatchSortsSchema = z.object({
    sortByCreditedAs: preprocessOptionalField(MongooseNumericSortOrderSchema),
    sortByCharacterName: preprocessOptionalField(MongooseNumericSortOrderSchema),
    sortByBillingOrder: preprocessOptionalField(MongooseNumericSortOrderSchema),
});

/**
 * Validated sorting parameters for movie credit queries.
 */
export type MovieCreditQueryMatchSorts =
    z.infer<typeof MovieCreditQueryMatchSortsSchema>;