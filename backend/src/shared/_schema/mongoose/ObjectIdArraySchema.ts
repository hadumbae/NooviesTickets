/**
 * @fileoverview Zod schema definitions and types for arrays of MongoDB ObjectIds.
 */

import { z } from "zod";
import { ObjectIdSchema } from "./ObjectIdSchema.js";

/** Schema for validating and parsing an array of MongoDB ObjectIds. */
export const ObjectIdArraySchema = z.array(ObjectIdSchema, {
    required_error: "Required.",
    invalid_type_error: "Must be a valid array of ObjectIds.",
});

/** Parsed type representation for an array of MongoDB ObjectIds. */
export type ObjectIdArray = z.infer<typeof ObjectIdArraySchema>;