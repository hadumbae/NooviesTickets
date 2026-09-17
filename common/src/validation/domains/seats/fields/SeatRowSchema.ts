/**
 * @fileoverview Zod schema for seat row identifiers.
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "../../../schema/strings/NonEmptyStringSchema";

/** Zod schema for validating a seat row string. */
export const SeatRowSchema = NonEmptyStringSchema.max(10, "Max. 10 Chars");

/** Type representing a seat row identifier. */
export type SeatRow = z.infer<typeof SeatRowSchema>;
