/**
 * @fileoverview Zod schema and TypeScript type for validating postal codes.
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "../strings";

/** Zod schema for validating a postal code. */
export const PostalCodeSchema = NonEmptyStringSchema.max(25, {message: "Max. 25 Chars"});

/** TypeScript type for a valid postal code. */
export type PostalCode = z.infer<typeof PostalCodeSchema>;
