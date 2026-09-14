/**
 * @fileoverview Defines TanStack Query keys for customer movie review views.
 *
 */

import {buildQueryKey} from "@/shared/_feat"

/** Query keys for fetching aggregated customer movie review data. */
export const CustomerReviewsViewQueryKeys = buildQueryKey(
    ["customer", "views"],
    {reviews: ["profile", "reviews", "index"]}
)