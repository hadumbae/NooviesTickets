/**
 * @fileoverview Zod schema and TypeScript type definition for validation error payload structures.
 */

import {z} from "zod";
import {ValidationIssueSchema} from "./ValidationIssueSchema";
import {generateArraySchema} from "../../builders/generateArraySchema";
import {ValidationErrorCodeSchema} from "../enums/validation-error-code/ValidationErrorCodeSchema";
import {preprocessOptionalField} from "../../preprocessors/preprocessOptionalField";
import {StringValueSchema} from "../strings/StringValueSchema";
import {PositiveIntegerSchema} from "../numbers/PositiveIntegerSchema";

/** Schema for validating validation error response payloads. */
export const ValidationErrorPayloadSchema = z.object({
    errorCode: ValidationErrorCodeSchema,
    errors: generateArraySchema(ValidationIssueSchema),
    message: preprocessOptionalField(StringValueSchema),
    raw: z.unknown().optional(),
    statusCode: PositiveIntegerSchema.optional(),
});

/** Inferred TypeScript type representing a validation error payload. */
export type ValidationErrorPayload = z.infer<typeof ValidationErrorPayloadSchema>;