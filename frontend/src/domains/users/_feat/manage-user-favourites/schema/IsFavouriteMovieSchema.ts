/**
 * @file Schema for favourite movie status response.
 * IsFavouriteMovieSchema.ts
 */

import {z} from "zod";
import {BooleanValueSchema} from "@noovies-tickets/common";
import {StringValueSchema} from "@noovies-tickets/common";

/** Response shape for favourite status checks. */
export const IsFavouriteMovieSchema = z.object({
    isFavourite: BooleanValueSchema,
    message: StringValueSchema.max(100, "Must be 100 characters or less"),
});

/** Inferred favourite status response type. */
export type IsFavouriteMovieMetadata = z.infer<typeof IsFavouriteMovieSchema>;