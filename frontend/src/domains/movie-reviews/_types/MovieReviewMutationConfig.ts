/**
 * @fileoverview Base configuration type for admin mutation operations targeting a specific movie review.
 */

import {ObjectIdString} from "@noovies-tickets/common";

/** Configuration object containing the target movie review ID for mutation operations. */
export type MovieReviewMutationConfig = {
    reviewID: ObjectIdString
};