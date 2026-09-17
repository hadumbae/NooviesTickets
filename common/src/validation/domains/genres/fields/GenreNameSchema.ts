/**
 * @fileoverview Zod validation schema and type definition for genre names.
 */

import {z} from "zod";
import {StringValueSchema} from "../../../schema/strings/StringValueSchema";

/** Validation schema for a genre name string. */
export const GenreNameSchema = StringValueSchema
    .trim()
    .min(3, "Min. 3 Chars")
    .max(255, "Max. 255 Chars");

/** Type inferred from the GenreNameSchema. */
export type GenreName = z.infer<typeof GenreNameSchema>;