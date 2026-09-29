/**
 * @fileoverview Utility for transforming URL sort parameters into Mongoose-compatible sort objects.
 */

import type {SortOrder} from "mongoose";
import type {MongooseSortOrder} from "@noovies-tickets/common";

function toSortOrder(value: MongooseSortOrder): SortOrder {
    if (value === "1") {
        return 1;
    } else if (value === "-1") {
        return -1;
    } else {
        return value;
    }
}

/**
 * Converts URL query sort parameters by removing prefixes and adjusting casing to match database schema fields.
 */
export function normaliseQuerySort(
    values: Record<string, MongooseSortOrder | undefined | null>
): Record<string, SortOrder> {
    return Object.fromEntries(
        Object.entries(values)
            .filter(([, value]) => value !== undefined && value !== null)
            .map(([key, value]) => [
                key.replace(/^sortBy/, '').replace(/^./, (v) => v.toLowerCase()),
                toSortOrder(value as MongooseSortOrder),
            ]),
    );
}