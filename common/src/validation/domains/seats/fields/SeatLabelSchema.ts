/**
 * @fileoverview Zod schema and type definition for seat labels.
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "../../../schema/strings/NonEmptyStringSchema";

/** Zod schema for validating a seat label string. */
export const SeatLabelSchema = NonEmptyStringSchema.max(25, "Max. 25 Chars");

/** Type definition for a seat label. */
export type SeatLabel = z.infer<typeof SeatLabelSchema>;
