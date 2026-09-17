/**
 * @fileoverview Normalizes URL sort query parameters into a Mongoose sort stage format.
 */

import type {MongooseSortOrder} from "@noovies-tickets/common";
import type {PipelineStage} from "mongoose";

/** Sort order values that the aggregation framework's `$sort` stage represents as `1`. */
const ASCENDING_SORT_ORDERS: readonly MongooseSortOrder[] = [1, "1", "asc", "ascending"];

/**
 * Converts a Mongoose-compatible sort order value into the numeric form MongoDB's
 * aggregation `$sort` stage understands — it only accepts `1` or `-1`, not the string
 * aliases ("asc", "ascending", etc.) that Mongoose's own Query#sort() builder accepts.
 */
function toAggregationSortOrder(value: MongooseSortOrder): 1 | -1 {
    return ASCENDING_SORT_ORDERS.includes(value) ? 1 : -1;
}

/** Normalizes URL sort query parameters into a Mongoose sort stage format. */
export function normaliseQuerySortValues(values: Record<string, MongooseSortOrder | undefined>): PipelineStage.Sort {
    const normalisedValues = Object.fromEntries(
        Object.entries(values)
            .filter((entry): entry is [string, MongooseSortOrder] => entry[1] !== undefined && entry[1] !== null)
            .map(([key, value]) => [
                key.replace(/^sortBy/, '').replace(/^./, (v) => v.toLowerCase()),
                toAggregationSortOrder(value),
            ]),
    );

    return {
        $sort: normalisedValues,
    };
}