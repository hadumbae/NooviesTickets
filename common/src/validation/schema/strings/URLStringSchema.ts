/**
 * @fileoverview Zod schema for validating URL strings.
 */

import {z} from "zod";
import {StringValueSchema} from "./StringValueSchema";

/** Zod schema that validates a string as a valid URL. */
export const URLStringSchema = StringValueSchema.url({message: "Must be a valid URL."});

/** TypeScript type inferred from the URL string schema. */
export type URLString = z.infer<typeof URLStringSchema>;