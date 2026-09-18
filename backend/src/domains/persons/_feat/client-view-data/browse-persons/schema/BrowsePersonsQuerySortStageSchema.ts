/**
 * @fileoverview Zod schema for validating and transforming person browsing sort parameters.
 */

import {z} from "zod";
import {normaliseQuerySortValues} from "@/shared/_feat/pipeline-schema-transformers";
import {MongooseSortOrderSchema, preprocessOptionalField} from "@noovies-tickets/common";

/** Schema for the sort stage of the browse persons query. */
export const BrowsePersonsQuerySortStageSchema = z
    .object({sortByName: preprocessOptionalField(MongooseSortOrderSchema)})
    .transform(normaliseQuerySortValues);

/** Type definition for the browse persons query sort stage. */
export type BrowsePersonsQuerySortStage = z.infer<typeof BrowsePersonsQuerySortStageSchema>;