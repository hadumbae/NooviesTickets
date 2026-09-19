/**
 * @fileoverview Zod schema and type definition for valid HTTP status codes.
 */

import {z} from "zod";
import {HTTPStatusCodeConstant} from "@/shared/_const";

/** Zod schema for validating HTTP status codes. */
export const HTTPStatusCodeSchema = z
    .coerce
    .number({required_error: "Required", invalid_type_error: "Must Be A Number"})
    .refine(
        (value) => (HTTPStatusCodeConstant as readonly number[]).includes(value),
        {message: "Must Be A Valid HTTP Status Code"},
    );

/** Type representing a valid HTTP status code. */
export type HTTPStatusCode = z.infer<typeof HTTPStatusCodeSchema>;