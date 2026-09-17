/**
 * @fileoverview Zod schema and type definitions for base model DTO entities containing an identifier.
 */

import {z} from "zod";
import {IDStringSchema} from "../additional-strings/id-strings/IDStringSchema";

/** Schema for validating base model DTO objects containing a unique identifier. */
export const BaseModelDTOSchema = z.object({
    _id: IDStringSchema,
});

/** Inferred TypeScript type representing a base model DTO entity. */
export type BaseModelDTO = z.infer<typeof BaseModelDTOSchema>;