/**
 * @fileoverview Zod schema and type definition for validating theatre screen names.
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "../../../schema/strings/NonEmptyStringSchema";

/** Schema for validating theatre screen names with a maximum length of 255 characters. */
export const TheatreScreenNameSchema = NonEmptyStringSchema.max(255, "Max. 255 Chars");

/** Inferred type for validated theatre screen names. */
export type TheatreScreenName = z.infer<typeof TheatreScreenNameSchema>;