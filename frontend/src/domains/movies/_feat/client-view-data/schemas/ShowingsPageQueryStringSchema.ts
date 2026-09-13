/**
 * @fileoverview Defines the schema and types for the showings page URL query parameters.
 */

import {z} from "zod";
import {StringValueSchema} from "@noovies-tickets/common";
import {PositiveIntegerSchema, preprocessOptionalField} from "@noovies-tickets/common";

/** Zod schema for validating and parsing showings page query strings. */
export const ShowingsPageQueryStringSchema = z.object({
    page: preprocessOptionalField(PositiveIntegerSchema),
    near: StringValueSchema.optional(),
});

/** Type definition derived from the ShowingsPageQueryStringSchema. */
export type ShowingsPageQueryStrings =
    z.infer<typeof ShowingsPageQueryStringSchema>;