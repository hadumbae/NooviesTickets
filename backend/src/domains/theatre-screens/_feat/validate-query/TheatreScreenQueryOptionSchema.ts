/**
 * @fileoverview Transformation logic for TheatreScreen query options.
 * Maps raw URL parameters into a structured Mongoose/MongoDB aggregation-compatible format.
 */

import {z} from "zod";
import {TheatreScreenQueryMatchFilterSchema} from "@/domains/theatre-screens/_feat/validate-query/option-schemas/TheatreScreenQueryMatchFilterSchema";
import {TheatreScreenQueryMatchSortSchema} from "@/domains/theatre-screens/_feat/validate-query/option-schemas/TheatreScreenQueryMatchSortSchema";
import type {AggregateQueryOptions} from "@/shared/_feat/generic-aggregate";
import {filterNullishAttributes} from "@noovies-tickets/common";

/**
 * Composite Zod schema with a transformation layer for TheatreScreen aggregation.
 */
export const TheatreScreenQueryOptionsSchema = TheatreScreenQueryMatchFilterSchema
    .merge(TheatreScreenQueryMatchSortSchema)
    .transform(
        (values): AggregateQueryOptions => ({
            match: {
                filters: {
                    $match: filterNullishAttributes({
                        _id: values._id,
                        name: values.name && {$regex: values.name, $options: "i"},
                        theatre: values.theatre,
                        capacity: values.capacity,
                        screenType: values.screenType,
                    })
                },
                sorts: {
                    $sort: filterNullishAttributes({
                        name: values.sortByName,
                        capacity: values.sortByCapacity,
                        screenType: values.sortByTheatreScreenType,
                        createdAt: values.sortByCreatedAt,
                    })
                }
            }
        })
    );

/**
 * Inferred type representing the final transformed aggregation options.
 */
export type TheatreScreenQueryOptions = z.infer<typeof TheatreScreenQueryOptionsSchema>;