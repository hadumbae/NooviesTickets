/**
 * @fileoverview Zod schema and type definition for theatre names.
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "../../../schema/strings/NonEmptyStringSchema";

/** Schema for validating a theatre name string. */
export const TheatreNameSchema = NonEmptyStringSchema.max(255, "Max. 255 Chars");

/** Type inferred from the TheatreNameSchema. */
export type TheatreName = z.infer<typeof TheatreNameSchema>;
