/**
 * @fileoverview Zod schema and type definitions for genre filtering options.
 */

import {z} from "zod";
import {BooleanValueSchema} from "../../../schema/booleans/BooleanValueSchema";
import {TrimmedStringSchema} from "../../../schema/strings/TrimmedStringSchema";
import {preprocessOptionalField} from "../../../preprocessors/preprocessOptionalField";
import {preprocessToBoolean} from "../../../preprocessors/preprocessToBoolean";

/** Zod schema for validating genre query filter parameters. */
export const GenreQueryFilterSchema = z.object({
    name: preprocessOptionalField(TrimmedStringSchema),
    isFeatured: preprocessToBoolean(BooleanValueSchema.optional()).optional(),
});

/** Type representing valid filter parameters for genre queries. */
export type GenreQueryFilters = z.infer<typeof GenreQueryFilterSchema>;
