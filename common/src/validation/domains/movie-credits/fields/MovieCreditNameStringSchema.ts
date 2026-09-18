/**
 * @fileoverview Zod schema and type definition for validating movie credit name strings.
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "../../../schema/strings/NonEmptyStringSchema";

/** Schema for validating movie credit names up to 150 characters. */
export const MovieCreditNameStringSchema = NonEmptyStringSchema.max(150, {message: "Max. 150 Chars"});

/** Inferred TypeScript type for validated movie credit names. */
export type MovieCreditNameString = z.infer<typeof MovieCreditNameStringSchema>;