/**
 * @fileoverview Validation schema for sorting MovieCredit entities in database queries.
 * Normalizes UI-driven sort parameters into Mongoose-compatible numeric literals.
 */

import {z} from "zod";
import {MongooseSortOrderSchema, preprocessOptionalField} from "@noovies-tickets/common";

/**
 * Zod schema defining sort criteria for MovieCredit queries.
 */
export const MovieCreditQueryMatchSortsSchema = z.object({
    sortByCreditedAs: preprocessOptionalField(MongooseSortOrderSchema),
    sortByCharacterName: preprocessOptionalField(MongooseSortOrderSchema),
    sortByBillingOrder: preprocessOptionalField(MongooseSortOrderSchema),
});

/**
 * TypeScript type inferred from MovieCreditQueryMatchSortsSchema.
 */
export type MovieCreditQueryMatchSorts = z.infer<typeof MovieCreditQueryMatchSortsSchema>;