/**
 * @fileoverview Zod schema and type definition for genre descriptions.
 */

import {z} from "zod";
import {TrimmedStringSchema} from "../../../schema/strings/TrimmedStringSchema";

/** Zod schema for validating genre description strings. */
export const GenreDescriptionSchema = TrimmedStringSchema
    .min(1, "Must Not Be Empty")
    .max(1000, "Max. 1000 Chars");

/** Type inferred from the GenreDescriptionSchema. */
export type GenreDescription = z.infer<typeof GenreDescriptionSchema>;