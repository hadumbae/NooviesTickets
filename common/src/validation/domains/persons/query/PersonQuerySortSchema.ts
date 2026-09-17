/**
 * @fileoverview Zod schema and type definitions for Person query sorting options.
 */

import {z} from "zod";
import {MongooseSortOrderSchema} from "../../../schema/mongoose/MongooseSortOrderSchema";
import {preprocessOptionalField} from "../../../preprocessors/preprocessOptionalField";

/** Zod schema for validating person query sort parameters. */
export const PersonQuerySortSchema = z.object({
    sortByName: preprocessOptionalField(MongooseSortOrderSchema),
    sortByDob: preprocessOptionalField(MongooseSortOrderSchema),
    sortByNationality: preprocessOptionalField(MongooseSortOrderSchema),
});

/** Type representing valid sort parameters for person queries. */
export type PersonQuerySorts = z.infer<typeof PersonQuerySortSchema>;
