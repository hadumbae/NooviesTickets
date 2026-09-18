/**
 * @fileoverview Defines the validation schema and type for movie review ratings.
 */

import {z} from "zod";
import {PositiveIntegerSchema, preprocessToNumber} from "@noovies-tickets/common";

/** Zod schema validating that a rating is an integer between 0 and 5. */
export const MovieReviewRatingSchema = preprocessToNumber(PositiveIntegerSchema.gte(0, "Min. 0").lte(5, "Max. 5"));

/** Type representing a valid movie review rating value. */
export type MovieReviewRating = z.infer<typeof MovieReviewRatingSchema>;