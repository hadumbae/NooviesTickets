/**
 * @fileoverview Zod schema for validating 24-character MongoDB-style ObjectIDs.
 */

import {z} from "zod";
import {StringValueSchema} from "../../strings/StringValueSchema";

/** Zod schema that validates a string is exactly 24 characters long. */
export const IDStringSchema = StringValueSchema.length(24, "Must Be A Valid Mongoose ID String");

/** Type definition inferred from the ID string schema. */
export type ObjectIdString = z.infer<typeof IDStringSchema>;