/**
 * @fileoverview Defines the validation schema and type for movie titles.
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "../../../schema/strings/NonEmptyStringSchema";

/** Zod schema for validating a movie title string. */
export const MovieTitleSchema = NonEmptyStringSchema.max(250, "Max. 250 Chars");

/** Type definition for a valid movie title. */
export type MovieTitle = z.infer<typeof MovieTitleSchema>;
