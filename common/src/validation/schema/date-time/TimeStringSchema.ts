/**
 * @fileoverview Zod schema and type definition for time strings in 24-hour format.
 */

import { z } from "zod";
import {StringValueSchema} from "../strings/StringValueSchema";

/** Zod schema that validates a string matches the hh:mm time format. */
export const TimeStringSchema = StringValueSchema
    .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, "hh:mm Format Required");

/** Type representing a validated time string. */
export type TimeString = z.infer<typeof TimeStringSchema>;
