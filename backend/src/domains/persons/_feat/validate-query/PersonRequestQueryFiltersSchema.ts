/**
 * @fileoverview Validation schema and types for Person query filtering.
 */

import {z} from "zod";
import {PersonQueryFilterSchema, UTCDateOnlySchema} from "@noovies-tickets/common";
import {ObjectIdSchema} from "@/shared/_schema/mongoose/ObjectIdSchema";
import {URLParamRegexPatternSchema} from "@/shared/_feat/parse-query-string";

/**
 * Validates filtering criteria for Person queries.
 * Extends the shared base filter schema with Mongoose-specific transforms.
 */
export const PersonRequestQueryFiltersSchema = PersonQueryFilterSchema
    .omit({_id: true, name: true, dob: true})
    .extend({
        _id: ObjectIdSchema.optional(),
        name: URLParamRegexPatternSchema,
        dob: UTCDateOnlySchema.optional(),
    });

/**
 * Type representing validated filters for Person document queries.
 */
export type PersonRequestQueryFilters = z.infer<typeof PersonRequestQueryFiltersSchema>;
