/**
 * @fileoverview Zod schema and type definition for standardized error response payloads.
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "@noovies-tickets/common";
import {HTTPStatusCodeSchema} from "@/shared/_schemas/http/HTTPStatusCodeSchema.ts";
import {ErrorCodeSchema} from "@/shared/_schemas/errors/ErrorCodeSchema.ts";

/** Zod schema for validating error response objects containing status codes and error details. */
export const ErrorResponsePayloadSchema = z.object({
    statusCode: HTTPStatusCodeSchema.catch("500"),
    errorCode: ErrorCodeSchema.catch("unknown_error"),
    issue: NonEmptyStringSchema.max(500, {message: "Max. 500 Chars"}),
    description: NonEmptyStringSchema.optional(),
});

/** Type definition for the error response payload inferred from the Zod schema. */
export type ErrorResponsePayload = z.infer<typeof ErrorResponsePayloadSchema>;