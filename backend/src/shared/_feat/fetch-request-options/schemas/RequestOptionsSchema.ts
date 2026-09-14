/**
 * @fileoverview Zod schema for standardized API request configuration.
 * Handles the coercion and validation of URL query parameters into strongly-typed
 * options for database operations, including pagination and model hydration toggles.
 */

import {z} from "zod";
import {BooleanValueSchema, NumberValueSchema, preprocessToBoolean, preprocessToNumber} from "@noovies-tickets/common";

/**
 * Validates global request modifiers for fetching data.
 */
export const RequestOptionsSchema = z.object({
    populate: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
    virtuals: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
    limit: preprocessToNumber(NumberValueSchema.optional()).optional(),
    page: preprocessToNumber(NumberValueSchema.optional()).optional(),
    perPage: preprocessToNumber(NumberValueSchema.optional()).optional(),
});

/**
 * TypeScript type inferred from RequestOptionsSchema.
 * Used to ensure type-safety across service and repository layers when
 * configuring fetch operations.
 */
export type RequestOptions = z.infer<typeof RequestOptionsSchema>;
