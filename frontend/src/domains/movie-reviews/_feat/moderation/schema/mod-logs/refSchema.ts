/**
 * @fileoverview Defines the Zod validation schema for Movie Review moderation log entries.
 *
 */

import {z} from "zod"
import {MovieReviewModerationActionSchema} from "@noovies-tickets/common"
import {IDStringSchema, NonEmptyStringSchema, ISO8601DateTimeSchema} from "@noovies-tickets/common";

/**
 * Zod validation schema for an individual moderation audit entry.
 */
export const MovieReviewModerationLogReferenceSchema = z.object({
    _id: IDStringSchema,
    review: IDStringSchema,
    action: MovieReviewModerationActionSchema,
    admin: IDStringSchema,
    modDate: ISO8601DateTimeSchema,
    message: NonEmptyStringSchema.max(500, "Must be 500 characters or less."),
})

/**
 * Represents a moderation log entry used for administrative audit trails.
 */
export type MovieReviewModerationLogReference = z.infer<typeof MovieReviewModerationLogReferenceSchema>