/**
 * @fileoverview Validation schema and types for Movie query filtering.
 */

import {z} from "zod";
import {MovieQueryFilterSchema, preprocessOptionalField, UTCDateOnlySchema} from "@noovies-tickets/common";
import {ObjectIdSchema} from "@/shared/_schema/mongoose/ObjectIdSchema";
import {URLParamRegexPatternSchema} from "@/shared/_feat/parse-query-string";

/**
 * Validates filtering criteria for Movie queries.
 * Extends the shared base filter schema with Mongoose-specific transforms.
 */
export const MovieRequestQueryFiltersSchema = MovieQueryFilterSchema
    .omit({_id: true, title: true, originalTitle: true, releaseDate: true})
    .extend({
        _id: preprocessOptionalField(ObjectIdSchema),
        title: URLParamRegexPatternSchema,
        originalTitle: URLParamRegexPatternSchema,
        releaseDate: preprocessOptionalField(UTCDateOnlySchema),
    });

/**
 * Type representing validated filters for Movie document queries.
 */
export type MovieRequestQueryFilters = z.infer<typeof MovieRequestQueryFiltersSchema>;
