/**
 * @fileoverview Zod schema and TypeScript type definition for validation issue objects.
 */

import {z} from "zod";
import {StringValueSchema} from "../strings/StringValueSchema";
import {generateArraySchema} from "../../builders/generateArraySchema";

/** Zod validation schema for individual validation issue details. */
export const ValidationIssueSchema = z.object({
    code: z.literal("custom", {required_error: "Required", invalid_type_error: "Must Be 'custom'"}),
    path: generateArraySchema(StringValueSchema),
    message: StringValueSchema,
});

/** Inferred TypeScript type representing a validation issue. */
export type ValidationIssue = z.infer<typeof ValidationIssueSchema>;